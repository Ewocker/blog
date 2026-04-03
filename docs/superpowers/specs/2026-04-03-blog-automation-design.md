# Blog Automation System — Design Spec

> Approved design for automating blog content creation, storage strategy, and publishing pipeline for blog.ewocker.com.

## Scope

This spec covers 4 sub-projects in priority order:

| # | Sub-Project | Status |
|---|------------|--------|
| B | Content storage strategy (Obsidian + blog integration) | Primary — designed in full |
| A | Blog writing automation (style-aware conversion skill) | Designed — depends on B |
| C | Website modernization (UI, testing, packages) | Deferred — separate spec |
| D | Auto-publish pipeline (notifications, preview) | Stretch goal — designed |

Sub-projects C (website modernization) is intentionally deferred to a separate design cycle. It does not block A, B, or D.

---

## Architecture Overview

```
Obsidian Vault                           Blog Repo (blog.ewocker.com)
─────────────                           ────────────────────────────
Blog/                                   content/1.blog/
  ideas/    (#blog/idea)                  0XX.series-name/
  drafts/   (#blog/draft)     ──────►      0.index.md
  published.md                              00.md, 01.md...
                               Claude
References/                    Skill     draft/
  blog-style-guide.md  ──────►            (pre-existing WIP posts)

                                         .github/workflows/
                                           notify-preview.yml
                                                │
                                                ▼
                                         Netlify Deploy Preview
                                                │
                                                ▼
                                         Email notification
                                         (Gmail: chockerlin@gmail.com)
```

**Two separate systems, one skill bridge.**
- Obsidian: thinking, drafting, ideation (standard MD, vault conventions)
- Blog repo: curated, published output (nuxt-content format, custom components)
- Claude skill: reads from both, writes to blog repo via PR

---

## Sub-Project B: Content Storage Strategy

### Decision: Approach 2 — Two Repos, Skill as Bridge

Obsidian vault and blog repo stay fully separate. No symlinks between them. The Claude skill is the bridge.

### Obsidian Side

**New folder:** `Blog/` in the vault root.

| Path | Purpose | Tags |
|------|---------|------|
| `Blog/ideas/` | Raw ideas, any language, any format | `#blog/idea` |
| `Blog/drafts/` | Developed drafts ready for conversion | `#blog/draft` |
| `Blog/published.md` | Index mapping drafts → published blog URLs + PR links | `#blog/index` |

**All notes follow vault conventions:**
- YAML frontmatter with `created`, `tags`, `type`, `status`
- No date prefixes in filenames
- Tags: `#blog/idea`, `#blog/draft`, `#blog/type/narrative`, `#blog/type/career`, etc.

**Drafts can be in any language** — English, Chinese, mixed. The skill handles conversion.

**published.md format:**
```markdown
---
created: 2026-04-03
tags:
  - blog
  - index
type: reference
status: active
---

# Published Blog Posts

| Draft | Blog URL | PR | Published |
|-------|----------|----| ---------|
| [[my-idea]] | https://blog.ewocker.com/blog/... | #5 | 2026-04-10 |
```

### Blog Repo Side

No changes to existing `content/` structure. Everything stays as-is:
- `content/1.blog/` — published posts in nuxt-content format
- `draft/` — pre-existing WIP posts (legacy, can coexist)
- New: `netlify.toml` for deploy preview config
- New: `.github/workflows/notify-preview.yml` for email notifications

### Style Guide

**Location:** `References/blog-style-guide.md` in the Obsidian vault.

Already written and approved. 800+ lines covering:
- 2 author identities with distinct voices
- 6 post type profiles with structural blueprints
- 22 dimensions of writing style (emoji system, connector vocabulary, punctuation personality, bold/italic rules, sentence starters, paragraph architecture, Chinese/English mixing rules, image system, custom components, character introduction formula, description depth, metaphor inventory, number integration, callback patterns, opening/closing patterns, series naming, read time correlation, frontmatter template, sanitization rules)
- 16 anti-patterns

The skill reads this file every invocation (not cached) so edits take effect immediately.

---

## Sub-Project A: Blog Writing Automation

### Skill Design

**Location:** `Skills/personal/blog-publisher.md` in Obsidian vault, symlinked to `~/.claude/skills/blog-publisher/SKILL.md`

### Workflow

```
1. User writes draft in Obsidian (Blog/drafts/my-idea.md)
   - Any language, any format, tagged #blog/draft

2. User invokes: "publish my-idea as a blog post"

3. Skill reads:
   - Obsidian draft (Blog/drafts/my-idea.md)
   - Style guide (References/blog-style-guide.md)
   - Existing posts in blog repo (for series context if applicable)

4. Skill infers post type from content:
   - Narrative, self-improvement, career, technical, educational, guest
   - Unless user specifies explicitly or draft is tagged (#blog/type/career)
   - Asks user to confirm type + series placement

5. Skill generates:
   - Full blog post with correct nuxt-content frontmatter
   - Custom components (::epilogue, ::note, ::note-img, ::footnote-block)
   - Proper Chinese/English mixing per style guide
   - Correct series numbering and episode naming
   - Hero image placeholder (user provides actual image)

6. Skill publishes:
   - Creates feature branch in blog repo (e.g., blog/my-idea)
   - Writes post to content/1.blog/[series]/[episode].md
   - Commits, pushes, opens PR via gh CLI
   - Returns Netlify preview URL once deploy completes

7. User reviews preview → merges PR when ready

8. Skill updates Obsidian:
   - Updates draft status to "published"
   - Adds entry to Blog/published.md with blog URL + PR link
```

### Conversion Rules

| Input | Output |
|-------|--------|
| English draft | Traditional Chinese blog post with English tech terms preserved |
| Chinese draft | Tone-adjusted to match post type voice |
| Mixed language | Normalized per Chinese/English mixing rules in style guide |
| `[[wiki links]]` | Stripped — replaced with plain text or blog URLs |
| Vault paths | Stripped — no internal paths in output |
| Work-specific references | Stripped — no Adobe internals leak through |
| Obsidian frontmatter | Converted to nuxt-content frontmatter format |
| Obsidian tags | Converted to blog keywords |

### Inference Logic

The skill infers post type by analyzing draft content:

| Signal | Inferred Type |
|--------|--------------|
| Personal story, chronological, team members | Narrative Series |
| Frameworks, self-help, goal-setting | Self-Improvement Series |
| Interview process, company comparison, salary | Career/Interview |
| Code blocks, architecture, commands | Technical Tutorial |
| School, program review, pros/cons | Educational/Advice |
| Tagged `#blog/type/X` | Explicit override |

User always confirms before generation proceeds.

### Series Handling

For new episodes in existing series:
- Skill reads all existing episodes to maintain continuity
- Determines next episode number
- Maintains callback patterns to previous episodes
- Uses series-specific ::epilogue format
- Preserves metaphor family

For new series:
- Skill determines next available directory number
- Creates `0.index.md` + first episode
- Establishes series name, epilogue format, metaphor family

---

## Sub-Project D: Notification Pipeline (Stretch Goal)

### GitHub Actions + Email

**Trigger:** PR opened by the blog-publisher skill.

**Workflow:**
1. PR is opened → GitHub Action fires
2. Waits for Netlify deploy preview to be ready (poll deploy status)
3. Extracts preview URL from GitHub deployment status
4. Sends email to `chockerlin@gmail.com` via GitHub Action (e.g., `dawidd6/action-send-mail`)

**Email content:**
- Subject: `[Blog Preview] {post title}`
- Body: Post type, series (if applicable), preview URL, PR link
- CTA: "Review and merge to publish"

**File:** `.github/workflows/notify-preview.yml`

**Authentication:** GitHub Action secret for SMTP credentials (Gmail app password or SendGrid).

---

## Netlify Configuration

**New file:** `netlify.toml` in blog repo root.

```toml
[build]
  command = "nuxt generate"
  publish = ".output/public"

[context.deploy-preview]
  command = "nuxt generate"
```

**Dashboard setting:** Site settings → Build & deploy → Deploy contexts → "Deploy previews: Any pull request"

---

## What This Spec Does NOT Cover

These are deferred to separate design cycles:

1. **Website modernization (Sub-Project C):**
   - UI component library (Vuetify or alternative)
   - Automated testing
   - Package/Node version upgrades
   - Tailwind replacement decision
   - Performance improvements

2. **Content migration:** Existing blog posts stay in the repo. No migration to Obsidian.

3. **Beverly's posts:** Guest author workflow is out of scope. Style guide documents her patterns but the skill focuses on 小貓貓工程師 voice.

4. **Image generation:** Hero images are provided by the user. No AI image generation in scope.

---

## Implementation Order

| Phase | What | Depends On |
|-------|------|-----------|
| 1 | Create Obsidian `Blog/` folder structure | Nothing |
| 2 | Create blog-publisher skill | Style guide (done) |
| 3 | Add `netlify.toml` to blog repo | Nothing |
| 4 | Enable Netlify deploy previews | Phase 3 |
| 5 | Create GitHub Action for email notifications | Phase 4 |
| 6 | Test end-to-end: write draft → skill → PR → preview → email → merge | All phases |
