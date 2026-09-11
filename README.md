# blog.ewocker.com

Personal blog of 小貓貓工程師 (Silicon Valley Kitty Cat Engineer). Bilingual, primarily Traditional Chinese. Built with Nuxt 3 and @nuxt/content, deployed as a static site on Netlify.

## What is here

- `content/1.blog/` - the posts, one numbered directory per series (startup story, internship, career and interviews, Docker and Kubernetes tutorials, OMSCS course reviews, personal growth, US life, an AI-daily series, and a guest data-science series).
- `content/10.career-copilot.md`, `content/11.golf.md` - interactive pages. Each embeds a self-contained single-file app from `public/` in an iframe.
- `components/content/` - the custom Markdown components posts use (`::note`, `::note-img`, `::epilogue`, `::footnote-block`, `::colophon`, ...).
- `docs/superpowers/` - design specs and plans for the blog automation and the golf comparison page.
- `AGENTS.md` - instructions for coding agents, including the automated writing pipeline.

## How posts get written

Since April 2026 most posts start as a draft in an Obsidian vault and are converted into a finished post by a Claude Code skill (`blog-publisher`) that applies a 900-line style guide extracted from the existing posts. The skill generates the Markdown, the hero image prompt (rendered through Adobe Firefly when a token is available), opens a pull request on a `blog/<slug>` branch, and Netlify builds a deploy preview for review. Merging the PR publishes the post. The draft, the style guide, and the skill live in the vault, not in this repo; `obsidian-link` is a read-only symlink to the vault's `Blog/` folder for convenience. See `AGENTS.md` for the full flow and the rules.

Posts written this way carry the `AI 加速` keyword and a `::colophon` disclosure.

## Development

Requires Node 18+ and yarn.

```bash
git clone git@github.com:Ewocker/blog.git
cd blog
yarn install
yarn dev        # http://localhost:3000
```

```bash
yarn generate   # static build into .output/public (dist -> .output/public)
yarn preview    # serve the generated site
```

Component playground: http://localhost:3000/blog/_storybook

## Deployment

Netlify. Production builds from `main`; every pull request gets a deploy preview (`netlify.toml`, `context.deploy-preview`). `.github/workflows/notify-preview.yml` emails the preview URL for PRs opened by the publishing skill once the `NETLIFY_*` and `GMAIL_*` repository secrets are configured.

## Known issues

- Code highlighting: https://github.com/nuxt/content/issues/1490
