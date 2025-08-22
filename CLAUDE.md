# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based developer blog (cckn's Devlog) using the gatsby-starter-bee template. The blog contains technical articles in Korean covering topics like algorithms, backend development, DevOps, Docker, Kubernetes, and more.

## Development Commands

```bash
# Start development server
npm run dev  # or npm run develop, npm start

# Build for production
npm run build

# Generate new blog post template
npm run post

# Linting and formatting
npm run lint    # ESLint check
npm run format  # Prettier formatting
```

## Blog Post Structure

### Content Organization
- Blog posts are located in `content/blog/` with subdirectories for categories
- Categories include: `dev`, `backend`, `frontend`, `algorithm`, `devops`, `docker`, `kubernetes`, etc.

### Frontmatter Format
```yaml
---
title: Post Title Without Quotes
date: YYYY-MM-DD HH:MM:SS
category: category-name
thumbnail: { thumbnailSrc }
draft: false
---
```

### Creating New Posts
1. Create a new `.md` file in the appropriate category folder under `content/blog/`
2. Use the frontmatter format above
3. Set `draft: true` while writing, change to `false` when ready to publish

## Architecture and Key Files

### Configuration
- **gatsby-config.js**: Main Gatsby configuration, plugin setup, and source filesystem paths
- **gatsby-meta-config.js**: Site metadata including title, author, social links, Google Analytics, and Utterances comments
- **gatsby-node.js**: Creates pages from markdown files, filters out drafts and posts without categories

### Key Components
- **src/templates/blog-post.js**: Template for individual blog posts
- **src/pages/index.js**: Main blog listing page with category filtering and infinite scroll
- **src/pages/about.js**: About page
- **src/hooks/**: Custom React hooks for category management, infinite scroll, and scroll events

### Data Flow
1. Markdown files in `content/blog/` are processed by `gatsby-transformer-remark`
2. Posts with `draft: false` and a valid `category` are published
3. GraphQL queries fetch post data sorted by date
4. Category filtering and infinite scroll handle post display

## Gatsby Plugins

Key plugins configured:
- **gatsby-transformer-remark**: Processes markdown with support for:
  - KaTeX math expressions
  - Images with zoom
  - Code highlighting (Prism.js)
  - Auto-linking headers
  - Emoji support
- **gatsby-plugin-gtag**: Google Analytics tracking
- **gatsby-plugin-feed**: RSS feed generation
- **gatsby-plugin-sitemap**: Sitemap generation

## Writing Guidelines

### Language
- Primary language is Korean
- Write in a natural, conversational Korean style
- Avoid overly formal or AI-generated tone

### Code Examples
- Use appropriate language tags for syntax highlighting
- Keep examples concise and relevant
- Test code snippets before including them

### Image Handling
- Images are stored in `content/assets/`
- Gatsby automatically optimizes images
- Use markdown image syntax or gatsby-remark-images

## VS Code Settings

The project has specific VS Code configurations in `.vscode/settings.json`:
- Auto-format on save enabled
- Markdown lint fixes on save
- Various files/folders hidden for cleaner workspace

## Comments System

Uses Utterances (GitHub issues-based comments) configured to the `cckn/devlog` repository.