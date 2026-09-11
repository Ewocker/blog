# AGENTS.md

Instructions for any coding agent working in this repository. `CLAUDE.md` is a pointer to this file.

## Overview

Personal blog of 小貓貓工程師 (Silicon Valley Kitty Cat Engineer) at **blog.ewocker.com**. A Nuxt 3 document-driven static site written primarily in Traditional Chinese, deployed on Netlify. Posts are authored as Markdown under `content/` and, since April 2026, mostly produced by an automated Obsidian-to-blog pipeline described below.

## Commands

Package manager is yarn (`yarn.lock` is committed; Netlify runs `yarn generate`).

- `yarn dev` - local dev server on http://localhost:3000
- `yarn build` - production build
- `yarn generate` - static site generation into `.output/public` (`dist` is a symlink to it)
- `yarn preview` - preview the production build

No test framework is configured. Before opening a PR that touches content, run `yarn generate` once so a frontmatter mistake fails locally instead of on Netlify.

## Architecture

**Nuxt 3 + @nuxt/content** in document-driven mode. Nuxt Content generates routes from the `content/` file tree.

### Content structure

- `content/1.blog/` - all series. Each series is a numbered directory `NNN.slug/` with `0.index.md` (series landing, `layout: series`) and numbered episode files `00.md`, `01.md`, ... (`layout: post`). Numbers have gaps; a new series takes the next free number.
- `content/0.index.md`, `1.blog.md`, `99.tag.md` - home, blog listing, and tag pages.
- `content/2.author/` - author pages.
- `content/10.career-copilot.md`, `content/11.golf.md` - interactive pages. Each is a thin stub with its own layout that iframes a self-contained app under `public/` (`public/golf-app/index.html`). Follow this pattern for new interactive pages.
- `draft/` - legacy hand-written WIP posts predating the pipeline. Not built. New drafts do not go here; they live in the Obsidian vault (see below).

Post frontmatter must include `layout`, `series`, `title`, `description`, `image` (`src`/`alt`/`width`/`height`), `keywords`, and `head.meta` with `author`, `read`, `article:published_time`, and `article:modified_time`. The canonical template is section 3.23 of the style guide.

### Layouts

`home`, `blog` (lists pages with `layout: series`), `series` (episodes plus tags), `post` (hero image, ToC, author, prev/next), `tag`, `career-copilot`, `golf`.

### Key directories

- `components/content/` - MDC components usable in Markdown: `::note`, `::note-img`, `::epilogue`, `::footnote-block`, `::colophon`, `::asciinema`, `::blog-image`, `::section`.
- `components/BlogAuthor/data.ts` - author registry.
- `utils/` - `nuxt-content.ts` (page metadata helpers), `image.ts` (`computeImageSrc()` resolves relative hero paths), `date.ts`.
- `type/nuxt-content-type.ts` - Nuxt Content Page and Toc types.
- `data/redirect.ts` - redirects from the legacy flat URL structure; wired into `routeRules` in `nuxt.config.ts`.
- `assets/fonts/cyly/` - custom font.
- `docs/superpowers/` - design specs and implementation plans (blog automation, golf comparison page).

### Styling

Tailwind CSS with `@tailwindcss/typography` and `@tailwindcss/line-clamp`. Prose overrides (link colors, inline code) live in `nuxt.config.ts` under `tailwindcss.config.theme.extend.typography`.

### Images

Episode hero: `public/blog/<series-slug>/<NN>/hero.jpeg`, referenced from frontmatter as `src: hero.jpeg` (750x536 display, 1500x1072 source, JPEG q80, under 150KB). Series index hero: `public/blog/<series-slug>/index/hero.png`. Inline images sit next to the hero.

## Writing a blog post automatically

The blog is fed by a pipeline that lives mostly outside this repo. Two systems, one skill as the bridge:

```
Obsidian vault (thinking)            this repo (publishing)
Blog/drafts/<name>.md   --blog-publisher skill-->   content/1.blog/NNN.slug/NN.md
References/blog-style-guide.md                      public/blog/<slug>/<NN>/hero.jpeg
                                                    feature branch -> PR -> Netlify deploy preview -> merge
```

### Where things live

| Piece | Location |
|---|---|
| Drafts (any language, tagged `blog/draft`) | vault `Blog/drafts/`; readable here through the committed `obsidian-link` symlink (read-only convenience, never write through it) |
| Published index | vault `Blog/Published Post Tracking.md` |
| Style guide ("tone file", voice DNA, 6 post types, 12 sections) | vault `References/blog-style-guide.md` |
| Converter skill | vault `Dotfiles/skills/personal/blog-publisher/SKILL.md`, symlinked to `~/.claude/skills/blog-publisher` |
| Image skill and script | `~/.claude/skills/image-generator`, `Scripts/firefly-generate.sh` in the vault (needs `FIREFLY_IMS_TOKEN`) |
| Design spec and plan | `docs/superpowers/specs/2026-04-03-blog-automation-design.md`, `docs/superpowers/plans/2026-04-03-blog-automation.md` |
| Preview notification | `.github/workflows/notify-preview.yml` |

The vault root is `~/Desktop/Dropbox/Project/Obsidian/default/`. Read the vault's own `AGENTS.md` before writing anything there.

### The flow

1. **Draft** in the vault under `Blog/drafts/`. English, Chinese, or mixed. Add `blog/type/<type>` to the tags to pin the post type; otherwise the skill infers it.
2. **Convert** by invoking the `blog-publisher` skill ("publish <draft-name>"). The skill reads the draft, reads the style guide fresh, reads every existing episode of the target series for numbering and callbacks, and asks for confirmation of type and series before generating.
3. **Generate** the post in the author's voice: Traditional Chinese with English tech terms, series frontmatter, `::epilogue` (mandatory on series episodes), `::footnote-block` for unfamiliar terms, and hero and inline image prompts. Image prompts for the hero go in the frontmatter as YAML `#` comments (never HTML comments, which break hydration); inline prompts go inside `::note-img` bodies as HTML comments.
4. **Images** through the `image-generator` skill (Adobe Firefly). Without a token the skill leaves the prompt and a TODO placeholder for the author.
5. **Review** with the author, iterate on text and images.
6. **Publish**: branch `blog/<slug>` from an up-to-date `main`, add the post and `public/blog/<slug>/<NN>/`, commit `add: <post title>`, push, open a PR whose body contains the literal text `blog-publisher skill` so the notification workflow matches. Netlify builds a deploy preview for every PR.
7. **Merge** is the author's decision. Never push to `main` directly.
8. **Update the vault**: set the draft's `status: published` and add a row to `Blog/Published Post Tracking.md`.

### Rules that hold regardless of who runs the pipeline

- Read the style guide fresh every time; do not work from memory of it. It is the single source of truth for voice, structure, components, and anti-patterns.
- Traditional Chinese only for 小貓貓工程師. Never 簡體字. Course codes, product names, and technical terms stay English.
- Every AI-assisted post carries the `AI 加速` keyword and a `::colophon` (`本文由小貓貓工程師與 AI 協作完成`) after the `::epilogue`.
- Strip vault wiki links, vault paths, and anything work-internal (Adobe tools, team names, codenames) before it lands in `content/`.
- Never invent series numbering; count the existing episode files in the series directory.
- Never hand-edit the author's published posts for style; the style guide is edited instead, and the change flows into the next post.
- Netlify preview notification by email needs the repository secrets `GMAIL_USERNAME` and `GMAIL_APP_PASSWORD`. The workflow waits on the Netlify commit status, so no Netlify credentials are needed.

## Series currently on the blog

`010.ai-daily` 工程師的 AI 日常, `011.omscs` Georgia Tech OMSCS 線上碩士 (course reviews, one episode per course), `012.sproutlabs`, `013.proofpoint-internship`, `014.container-docker`, `015.k8s-intro`, `017.next-step-to-personal-growth`, `018.us-stuff`, `019.career`, `020.about-ds` (guest author 小喵喵数据分析师, Simplified Chinese, no epilogue).

## Maintaining this file

Keep only what almost every agent session in this repo needs. Point to the style guide, the skill, and the design spec instead of copying their contents. Prefer pruning over appending.
