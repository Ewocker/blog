# Blog Automation System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an Obsidian-to-blog publishing pipeline with style-aware content conversion, Netlify deploy previews, and email notifications.

**Architecture:** Obsidian vault holds ideas/drafts + style guide. A Claude skill reads drafts, converts them to nuxt-content format matching the author's voice, and publishes via PR to the blog repo. Netlify generates preview URLs on PRs. GitHub Actions sends email notifications.

**Tech Stack:** Obsidian (vault), Claude Code skills (MD skill files), Nuxt 3 + @nuxt/content (blog), Netlify (hosting/previews), GitHub Actions (CI), Gmail SMTP (notifications)

---

## File Map

### Obsidian Vault (`~/Desktop/Dropbox/Project/Obsidian/default/`)

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `Blog/ideas/.gitkeep` | Folder for raw blog ideas |
| Create | `Blog/drafts/.gitkeep` | Folder for conversion-ready drafts |
| Create | `Blog/published.md` | Index of published posts |
| Create | `Skills/personal/blog-publisher.md` | The conversion/publishing skill |
| Exists | `References/blog-style-guide.md` | Voice DNA reference (already written) |

### Blog Repo (`~/Desktop/Dropbox/Project/blog/blog/`)

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `netlify.toml` | Build config + deploy preview settings |
| Create | `.github/workflows/notify-preview.yml` | Email notification on PR deploy |
| Modify | `.gitignore` | Already updated (`.superpowers`, `.cursor`) |

### Symlinks

| Link | Target |
|------|--------|
| `~/.claude/skills/blog-publisher/SKILL.md` | `~/Desktop/Dropbox/Project/Obsidian/default/Skills/personal/blog-publisher.md` |

---

## Task 1: Create Obsidian Blog Folder Structure

**Files:**
- Create: `~/Desktop/Dropbox/Project/Obsidian/default/Blog/ideas/.gitkeep`
- Create: `~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts/.gitkeep`
- Create: `~/Desktop/Dropbox/Project/Obsidian/default/Blog/published.md`

- [ ] **Step 1: Create Blog directory structure**

```bash
mkdir -p ~/Desktop/Dropbox/Project/Obsidian/default/Blog/ideas
mkdir -p ~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts
```

- [ ] **Step 2: Create published.md index**

Write the following to `~/Desktop/Dropbox/Project/Obsidian/default/Blog/published.md`:

```markdown
---
created: 2026-04-03
tags:
  - blog
  - blog/index
type: reference
status: active
---

# Published Blog Posts

| Draft | Blog URL | PR | Published |
|-------|----------|----|-----------|
```

- [ ] **Step 3: Create a sample idea note to verify structure**

Write the following to `~/Desktop/Dropbox/Project/Obsidian/default/Blog/ideas/sample-idea.md`:

```markdown
---
created: 2026-04-03
tags:
  - blog/idea
type: note
status: active
---

# Sample Blog Idea

This is a test idea to verify the Blog folder structure works in Obsidian.
Delete this file after confirming it appears correctly in the vault.
```

- [ ] **Step 4: Verify in Obsidian**

Open Obsidian and confirm:
- `Blog/` folder appears in the file explorer
- `Blog/ideas/sample-idea.md` renders correctly with frontmatter
- `Blog/published.md` renders the empty table
- Tags `#blog/idea` and `#blog/index` are discoverable

- [ ] **Step 5: Delete sample and commit vault changes**

```bash
rm ~/Desktop/Dropbox/Project/Obsidian/default/Blog/ideas/sample-idea.md
```

No git commit needed — Obsidian vault syncs via Dropbox.

---

## Task 2: Create Netlify Configuration

**Files:**
- Create: `~/Desktop/Dropbox/Project/blog/blog/netlify.toml`

- [ ] **Step 1: Create netlify.toml**

Write the following to `~/Desktop/Dropbox/Project/blog/blog/netlify.toml`:

```toml
[build]
  command = "nuxt generate"
  publish = ".output/public"

[context.deploy-preview]
  command = "nuxt generate"
```

- [ ] **Step 2: Verify build command works locally**

```bash
cd ~/Desktop/Dropbox/Project/blog/blog
yarn generate
```

Check that `.output/public/` is created with HTML files. If `yarn generate` fails, check that dependencies are installed (`yarn install`).

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/Dropbox/Project/blog/blog
git add netlify.toml
git commit -m "add netlify.toml for deploy preview support"
```

- [ ] **Step 4: Enable deploy previews in Netlify dashboard**

This is a manual step:
1. Go to https://app.netlify.com → select the blog site
2. Site settings → Build & deploy → Deploy contexts
3. Set "Deploy previews" to "Any pull request against your production branch"
4. Save

- [ ] **Step 5: Verify deploy previews work**

Create a test branch and PR to confirm Netlify generates a preview:

```bash
cd ~/Desktop/Dropbox/Project/blog/blog
git checkout -b test/deploy-preview
echo "<!-- test -->" >> content/0.index.md
git add content/0.index.md
git commit -m "test: verify deploy preview"
git push -u origin test/deploy-preview
gh pr create --title "test: verify deploy preview" --body "Testing Netlify deploy previews. Will delete after confirming."
```

Wait for Netlify to deploy. Check the PR for a deploy preview URL comment. Once confirmed, close and clean up:

```bash
gh pr close --delete-branch
git checkout main
```

---

## Task 3: Create Blog Publisher Skill

**Files:**
- Create: `~/Desktop/Dropbox/Project/Obsidian/default/Skills/personal/blog-publisher.md`
- Create symlink: `~/.claude/skills/blog-publisher/SKILL.md`

- [ ] **Step 1: Write the skill file**

Write the following to `~/Desktop/Dropbox/Project/Obsidian/default/Skills/personal/blog-publisher.md`:

```markdown
---
name: blog-publisher
description: Convert Obsidian drafts into blog posts matching 小貓貓工程師's voice and publish via PR
tools: Read, Write, Edit, Bash, Glob, Grep, Agent
model: opus
---

You are the Blog Publisher — a skill that converts Obsidian drafts into fully-formatted blog posts for blog.ewocker.com, then publishes them via pull request.

## Key Paths

- Obsidian vault: ~/Desktop/Dropbox/Project/Obsidian/default/
- Blog repo: ~/Desktop/Dropbox/Project/blog/blog/
- Style guide: ~/Desktop/Dropbox/Project/Obsidian/default/References/blog-style-guide.md
- Drafts: ~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts/
- Published index: ~/Desktop/Dropbox/Project/Obsidian/default/Blog/published.md
- Blog content: ~/Desktop/Dropbox/Project/blog/blog/content/1.blog/

## Workflow

When the user says "publish [draft-name]" or "convert [draft-name] to a blog post":

### Phase 1: Read & Analyze

1. Read the draft from `Blog/drafts/[name].md`
2. Read the style guide from `References/blog-style-guide.md`
3. Analyze the draft content to infer post type:
   - Personal story, chronological, team members → **Narrative Series**
   - Frameworks, self-help, goal-setting → **Self-Improvement Series**
   - Interview process, company comparison, salary → **Career/Interview**
   - Code blocks, architecture, commands → **Technical Tutorial**
   - School, program review, pros/cons → **Educational/Advice**
   - Check for explicit `#blog/type/X` tag in draft frontmatter as override
4. If the post belongs to an existing series, read all episodes in that series directory to understand:
   - Current episode count and numbering
   - Callback patterns from previous episodes
   - Series-specific ::epilogue format
   - Metaphor family used
5. Present the user with:
   - Inferred post type
   - Suggested series placement (new series or existing)
   - Suggested title format
   - Ask for confirmation before proceeding

### Phase 2: Generate

Generate a complete blog post following the style guide precisely:

1. **Frontmatter:** Use the template from style guide section 3.23. Fill in:
   - layout: post (or series for index)
   - series: Chinese series name
   - title: [Series名] [##] - [副標題] format
   - description: 2-4 sentences in the author's voice
   - image: hero.jpeg placeholder (width: 750, height: 536)
   - keywords: from draft tags + series keywords
   - author: 小貓貓工程師
   - read time: estimate based on content length (see section 3.22)
   - published_time: current ISO 8601 timestamp
   - modified_time: same as published_time

2. **Content conversion:**
   - If draft is in English → translate to Traditional Chinese with English tech terms preserved
   - If draft is in Chinese → adjust tone to match post type voice
   - If mixed → normalize per Chinese/English mixing rules (style guide 3.11)
   - Apply sanitization rules (style guide 3.24):
     - Strip [[wiki links]] → plain text or blog URLs
     - Remove vault paths
     - Strip work-specific references (Adobe internals)
     - Convert Obsidian tags to blog keywords

3. **Structure:** Follow the structural blueprint for the inferred post type:
   - Add appropriate ## headings per type blueprint
   - Insert ::note-img placeholders where images would enhance the narrative
   - Add ::footnote-block for English terms needing explanation (Tier 1 terms)
   - Add ::epilogue with correct series-specific format
   - For self-improvement type: add ::note with 🙌 artist credit if applicable
   - For career type: add ::note disclaimer at top

4. **Voice application:**
   - Use connector vocabulary ranked in style guide 3.5 (prefer 而, 但 over 但是, 然而)
   - Follow punctuation personality (3.6): restrained ！, strategic ～, no em-dashes
   - Apply emoji rules (3.4): type-appropriate density and placement
   - Use sentence patterns (3.9): parenthetical asides, impact sentences, vivid specifics
   - Follow opening pattern (3.19) appropriate to post type
   - Follow closing pattern (3.20): 4-layer structure for series episodes
   - Include 1-2 adapted Chinese idioms in conclusion if narrative/self-improvement type

5. **Image placeholders:** Insert comments where images should go:
   ```markdown
   ::note-img
   ![TODO: describe the image needed here](TODO-filename.jpeg)
   TODO: write casual caption in author's voice
   ::
   ```

### Phase 3: Review

Present the generated post to the user:
- Show the full markdown
- Highlight any TODO placeholders that need user input (images, specific details only the user knows)
- Ask if adjustments are needed
- Iterate until the user approves

### Phase 4: Publish

Once approved:

1. Determine the correct file path:
   - For existing series: `content/1.blog/[NNN].[series-slug]/[NN].md`
   - For new series: create directory `content/1.blog/[NNN].[new-slug]/`, write `0.index.md` + episode
   - Next episode number = count existing non-index .md files in series dir

2. Create branch and PR:
   ```bash
   cd ~/Desktop/Dropbox/Project/blog/blog
   git checkout main
   git pull origin main
   git checkout -b blog/[slug-from-title]
   ```

3. Write the post file to the correct path

4. If new series, also write `0.index.md` with layout: series frontmatter

5. Commit and push:
   ```bash
   git add content/1.blog/[series-dir]/
   git commit -m "add: [post title]"
   git push -u origin blog/[slug]
   ```

6. Open PR:
   ```bash
   gh pr create --title "[post title]" --body "## New Blog Post

   **Type:** [post type]
   **Series:** [series name or 'standalone']
   **Read time:** [N] min

   Preview will be available via Netlify deploy preview.

   ---
   Generated by blog-publisher skill"
   ```

7. Report back to user:
   - PR URL
   - Note that Netlify preview will be available shortly
   - Remind about TODO image placeholders if any remain

### Phase 5: Update Obsidian

After PR is created:

1. Update the draft's frontmatter status:
   ```yaml
   status: published
   ```

2. Add entry to `Blog/published.md`:
   ```markdown
   | [[draft-name]] | [pending deploy] | [#PR-number](PR-URL) | [date] |
   ```

## Important Rules

- ALWAYS read the style guide fresh — never rely on cached knowledge
- ALWAYS ask user to confirm post type and series before generating
- NEVER skip the ::epilogue on series episodes
- NEVER use 簡體字 — author uses Traditional Chinese (繁體)
- NEVER generate hero images — use placeholders for user to fill
- NEVER push directly to main — always use a feature branch + PR
- If the draft mentions Adobe internal tools, team names, or project codenames, strip them
- Respect the anti-patterns list in style guide section 10
```

- [ ] **Step 2: Create symlink**

```bash
mkdir -p ~/.claude/skills/blog-publisher
ln -sf ~/Desktop/Dropbox/Project/Obsidian/default/Skills/personal/blog-publisher.md ~/.claude/skills/blog-publisher/SKILL.md
```

- [ ] **Step 3: Verify symlink**

```bash
ls -la ~/.claude/skills/blog-publisher/SKILL.md
# Should show: SKILL.md -> /Users/yualin/Desktop/Dropbox/Project/Obsidian/default/Skills/personal/blog-publisher.md

head -5 ~/.claude/skills/blog-publisher/SKILL.md
# Should show the frontmatter starting with: ---
# name: blog-publisher
```

- [ ] **Step 4: Test skill discovery**

In Claude Code, run:
```
/blog-publisher
```

Verify the skill is found and its description appears. Don't run it yet — we need a test draft first.

---

## Task 4: End-to-End Test — Draft to PR

**Files:**
- Create: `~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts/test-post.md` (temporary)
- Create: `~/Desktop/Dropbox/Project/blog/blog/content/1.blog/011.omscs/02.md` (via skill, on branch)

- [ ] **Step 1: Create a test draft in Obsidian**

Write the following to `~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts/test-post.md`:

```markdown
---
created: 2026-04-03
tags:
  - blog/draft
  - blog/type/educational
type: note
status: draft
---

# OMSCS Course Review: CS6515 Graduate Algorithms

I just finished CS6515 Graduate Algorithms at Georgia Tech OMSCS. This is a required course for the ML specialization.

## Overview
The course covers dynamic programming, divide and conquer, graph algorithms, NP-completeness, and linear programming. It's considered one of the harder courses in the program.

## My Experience
I took this alongside full-time work at Adobe. The weekly workload was about 15-20 hours including lectures, homework, and exam prep. The exams are proctored and timed which adds pressure.

## Key Takeaways
- DP problems are the core of this course, practice on LeetCode helps
- The textbook (DPV) is actually good, read it
- Start homework early, the problems are tricky
- The curve is generous

## Would I Recommend It?
Yes, but take it when you have a lighter semester. Don't pair it with another hard course.
```

- [ ] **Step 2: Invoke the blog-publisher skill**

In Claude Code:
```
publish test-post as a blog post
```

The skill should:
1. Read the draft
2. Read the style guide
3. Infer type as Educational/Advice (OMSCS series)
4. Read existing OMSCS episodes (011.omscs/00.md, 01.md)
5. Ask you to confirm: Educational type, OMSCS series, episode 02
6. Generate a full blog post in 小貓貓工程師's voice with Traditional Chinese
7. Show you the post for review

- [ ] **Step 3: Review generated output**

Check that the generated post:
- Has correct nuxt-content frontmatter (layout: post, series: Georgia Tech OMSCS 線上碩士, etc.)
- Is written in Traditional Chinese with English tech terms preserved
- Follows the Educational/Advice structural blueprint
- Has ::epilogue matching OMSCS format
- Has correct episode numbering (02.md)
- Has no [[wiki links]], vault paths, or work references
- Follows connector vocabulary and punctuation rules from style guide
- Has TODO placeholders for hero image

- [ ] **Step 4: Approve and let skill create PR**

Approve the post. The skill should:
1. Create branch `blog/omscs-cs6515`
2. Write to `content/1.blog/011.omscs/02.md`
3. Commit and push
4. Open PR via `gh pr create`
5. Return PR URL

- [ ] **Step 5: Verify PR and Netlify preview**

```bash
gh pr view --web
```

Check:
- PR exists on GitHub with correct title and body
- Netlify deploy preview builds and generates a preview URL
- Preview URL shows the new blog post rendered correctly

- [ ] **Step 6: Clean up test**

If the generated post is good enough to keep, merge it. Otherwise:

```bash
gh pr close --delete-branch
```

Remove test draft:
```bash
rm ~/Desktop/Dropbox/Project/Obsidian/default/Blog/drafts/test-post.md
```

---

## Task 5: GitHub Action for Email Notifications

**Files:**
- Create: `~/Desktop/Dropbox/Project/blog/blog/.github/workflows/notify-preview.yml`

- [ ] **Step 1: Create the workflow file**

```bash
mkdir -p ~/Desktop/Dropbox/Project/blog/blog/.github/workflows
```

Write the following to `~/Desktop/Dropbox/Project/blog/blog/.github/workflows/notify-preview.yml`:

```yaml
name: Notify Blog Preview

on:
  pull_request:
    types: [opened]

jobs:
  notify:
    runs-on: ubuntu-latest
    # Only run for blog post PRs (created by blog-publisher skill)
    if: contains(github.event.pull_request.body, 'blog-publisher skill')
    steps:
      - name: Wait for Netlify deploy
        uses: probots-io/wait-for-netlify-action@v1
        id: netlify
        with:
          site_id: ${{ secrets.NETLIFY_SITE_ID }}
          max_timeout: 300
        env:
          NETLIFY_TOKEN: ${{ secrets.NETLIFY_TOKEN }}

      - name: Send email notification
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.GMAIL_USERNAME }}
          password: ${{ secrets.GMAIL_APP_PASSWORD }}
          subject: "[Blog Preview] ${{ github.event.pull_request.title }}"
          to: chockerlin@gmail.com
          from: "Blog Publisher <${{ secrets.GMAIL_USERNAME }}>"
          body: |
            A new blog post is ready for review!

            **Title:** ${{ github.event.pull_request.title }}

            **Preview URL:** ${{ steps.netlify.outputs.url }}

            **Pull Request:** ${{ github.event.pull_request.html_url }}

            ---
            Review the preview and merge the PR to publish.
```

- [ ] **Step 2: Set up GitHub secrets**

Go to https://github.com/Ewocker/blog/settings/secrets/actions and add:

| Secret | Value | How to get it |
|--------|-------|--------------|
| `NETLIFY_SITE_ID` | Your Netlify site ID | Netlify dashboard → Site settings → General → Site ID |
| `NETLIFY_TOKEN` | Netlify personal access token | https://app.netlify.com/user/applications#personal-access-tokens |
| `GMAIL_USERNAME` | `chockerlin@gmail.com` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | Gmail app password | https://myaccount.google.com/apppasswords (requires 2FA enabled) |

- [ ] **Step 3: Commit the workflow**

```bash
cd ~/Desktop/Dropbox/Project/blog/blog
git add .github/workflows/notify-preview.yml
git commit -m "add GitHub Action for blog preview email notifications"
```

- [ ] **Step 4: Push to main**

```bash
git push origin main
```

- [ ] **Step 5: Test the notification**

Re-run Task 4 (create a test draft → publish via skill → PR created). This time, verify:
1. GitHub Action triggers on PR open
2. It waits for Netlify deploy
3. Email arrives at chockerlin@gmail.com with preview URL and PR link

If email doesn't arrive, check:
- GitHub Actions tab for workflow run logs
- Gmail app password is correct (regular password won't work with 2FA)
- Gmail might need "Less secure apps" or app password enabled

---

## Task 6: Save Memory — Blog Automation Setup

This is a housekeeping task to ensure future Claude sessions know about the blog automation system.

- [ ] **Step 1: Save project memory**

Write a memory file recording the blog automation setup so future conversations have context.

Key facts to record:
- Blog automation system exists: Obsidian drafts → Claude skill → blog PR → Netlify preview → email
- Style guide location: `References/blog-style-guide.md` in Obsidian vault
- Skill location: `Skills/personal/blog-publisher.md` → symlinked to `~/.claude/skills/blog-publisher/SKILL.md`
- Blog repo: `~/Desktop/Dropbox/Project/blog/blog/` → `git@github.com:Ewocker/blog.git`
- Obsidian blog content: `Blog/ideas/`, `Blog/drafts/`, `Blog/published.md`
- Netlify deploy previews enabled on PRs
- GitHub Action sends email to chockerlin@gmail.com on blog PR

- [ ] **Step 2: Verify memory is indexed in MEMORY.md**
