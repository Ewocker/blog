# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog for 小貓貓工程師 (Silicon Valley Kitty Cat Engineer) at **blog.ewocker.com**. A Nuxt 3 document-driven blog written primarily in Traditional Chinese.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run generate` — static site generation
- `npm run preview` — preview production build

No test framework is configured.

## Architecture

**Nuxt 3 + @nuxt/content** in document-driven mode. Content is authored as Markdown files under `content/`, and Nuxt Content auto-generates routes from the file tree.

### Content structure

Content files live in `content/` with numeric prefix ordering (e.g., `1.blog/010.ai-daily/00.md`). Each series is a numbered directory under `1.blog/` with a `0.index.md` (series landing page) and numbered post files.

Post frontmatter must include: `layout`, `series`, `title`, `description`, `image` (src/alt/width/height), `keywords` array, and `head.meta` with `author`, `read` (read time), and `article:published_time`.

### Layouts

- `home` — landing page
- `blog` — blog listing (queries child pages with `layout: series`)
- `series` — series index showing posts + tags
- `post` — individual blog post with hero image, ToC, author, prev/next navigation
- `tag` — tag filtering page
- `career-copilot` — career copilot page

### Key directories

- `components/content/` — MDC components usable directly in Markdown (e.g., `::Note`, `::BlogImage`, `::Epilogue`, `::FootnoteBlock`)
- `components/BlogAuthor/data.ts` — author registry (Map of author name to profile data)
- `utils/` — `nuxt-content.ts` (page metadata helpers), `image.ts` (image src resolution), `date.ts`
- `type/nuxt-content-type.ts` — TypeScript types for Nuxt Content's Page and Toc
- `data/redirect.ts` — legacy URL redirects (old flat URL structure to current nested paths)
- `assets/fonts/cyly/` — custom font

### Styling

Tailwind CSS with `@tailwindcss/typography` (prose classes) and `@tailwindcss/line-clamp`. Typography customizations (link colors, inline code styling) are in `nuxt.config.ts` under `tailwindcss.config.theme.extend.typography`.

### Image handling

Post hero images use relative paths (e.g., `src: hero.jpeg`) resolved via `utils/image.ts` `computeImageSrc()`. Static images go in `public/`.

## Blog content conventions

- Blog is bilingual, primarily Traditional Chinese
- Author persona: 小貓貓工程師 (primary) or 小喵喵数据分析师
- Style guide for writing is maintained externally in the Obsidian vault (not in this repo)
