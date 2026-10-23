# Word Counter Studio

Word Counter Studio is a focused writing workspace built to help you draft, analyze, and refine text in real time. It gives you live writing metrics such as word count, character count, sentence count, reading time, speaking time, and more, while keeping the experience clean and distraction-free.

Whether you are writing an essay, article, note, or draft, this app helps you stay aware of how your content is performing without interrupting the flow of writing.

## Features

- Live word, character, sentence, paragraph, and line counting
- Reading and speaking time estimates based on custom words-per-minute settings
- Copy, paste, clear, and upload text tools
- Import .txt and .docx files directly into the editor
- Export drafts as .txt or .docx files
- Analyze public webpage content and paste it into the editor
- Dark mode support
- Local browser-based autosave behavior
- Minimal, writing-focused interface

## Tech Stack

- React 19
- Vite
- JavaScript
- Tailwind CSS v4
- Express
- Wouter for routing
- docx and mammoth for document handling
- Sonner for notifications

## Project Structure

```text
word-counter/
├── README.md
└── word-counter-studio/
    ├── client/                # Frontend React app
    ├── server/                # Express server
    ├── shared/                # Shared application resources
    ├── patches/               # pnpm patches
    ├── components.json        # UI component configuration
    ├── jsconfig.json          # JavaScript config
    ├── jsconfig.node.json     # Node config
    ├── package.json           # Scripts and dependencies
    ├── pnpm-lock.yaml         # Lockfile
    ├── template.json          # App template metadata
    ├── vite.config.js         # Vite configuration
    └── ...