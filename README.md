# AI Learning Portal

> **A comprehensive, production-ready, interactive educational website for learning Artificial Intelligence from foundations to advanced topics**

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Pages](https://img.shields.io/badge/chapters-15-orange)

## 🎯 Project Overview

A modern, fully-featured documentation-style learning portal that teaches AI concepts in a structured, highly readable, and visually rich format. Built with **Astro 4.16** for optimal performance and static export.

🌐 **Live Site**: [https://nchand02.github.io/AIConcepts](https://nchand02.github.io/AIConcepts)

### ✨ Key Features

- ✅ **15 Comprehensive Chapters** covering AI foundations through production systems
- ✅ **Dark/Light Mode** with persistent theme storage
- ✅ **Fully Responsive** - mobile, tablet, and desktop optimized
- ✅ **Interactive Diagrams** using Mermaid.js
- ✅ **Search Functionality** with keyboard shortcuts (Ctrl+K)
- ✅ **Table of Contents** auto-generated for each chapter
- ✅ **Code Copy** buttons on all code blocks
- ✅ **Scroll Progress** indicator
- ✅ **100% Static** - deployable to GitHub Pages, Netlify, Vercel
- ✅ **Accessible** - WCAG compliant, keyboard navigation
- ✅ **Print-Friendly** styles for offline reading

## 📚 Content Coverage

### Part I: Foundations (Chapters 1-5)
1. **Foundations of AI** - History, search algorithms, knowledge representation
2. **Machine Learning** - Supervised/unsupervised learning, algorithms
3. **Deep Learning** - Neural networks, CNNs, RNNs, architectures
4. **Transformers** - Attention mechanism, BERT, GPT, variants
5. **Large Language Models** - Training, prompting, scaling laws

### Part II: Applications (Chapters 6-10)
6. **Generative AI** - GANs, VAEs, diffusion models, Stable Diffusion
7. **Embeddings & Vector Databases** - Semantic search, CLIP, vector DBs
8. **RAG Systems** - Retrieval-augmented generation, chunking, evaluation
9. **Fine-Tuning & PEFT** - LoRA, QLoRA, instruction tuning, RLHF, DPO
10. **Multimodal AI** - Vision-language models, GPT-4V, CLIP

### Part III: Production (Chapters 11-15)
11. **AI Agents & MCP** - ReAct, AutoGPT, Model Context Protocol
12. **AI Tooling** - LangChain, LlamaIndex, Hugging Face ecosystem
13. **AI Infrastructure** - vLLM, quantization, distributed training
14. **System Design** - Architecture patterns, caching, monitoring
15. **Glossary** - Comprehensive A-Z terminology reference

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nchand02/AIConcepts.git
cd AIConcepts

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server with hot reload
npm run dev

# Server runs at http://localhost:4321
```

### Build for Production

```bash
# Generate static site in /dist folder
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Build the site
npm run build

# Deploy dist folder to gh-pages branch
# (Site configured for /AIConcepts base path)
```

## 🏗️ Project Structure

```
AIConcepts/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Main layout with navigation
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   └── chapters/                 # 15 chapter pages
│   └── env.d.ts
├── public/
│   ├── scripts/
│   │   └── main.js                   # Interactive features
│   └── styles/
│       └── global.css                # Design system
├── astro.config.mjs                  # Astro configuration
├── package.json
└── README.md

16 pages total (homepage + 15 chapters)
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Open search
- `Ctrl/Cmd + /` - Toggle dark mode
- `Escape` - Close modals
- `Tab` - Navigate interactive elements

## 🎨 Features Detail

### 🔍 Search
- Client-side semantic search across all content
- Keyboard shortcut support (Ctrl+K)
- Highlighting of search matches
- Real-time filtering

### 🌙 Theme Toggle
- Smooth dark/light mode transition
- Persistent storage (localStorage)
- Updates Mermaid diagrams automatically
- Accessible color contrast

### 📱 Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interactive elements
- Optimized for all screen sizes

### 📊 Diagrams
- Mermaid.js for flowcharts and graphs
- Theme-aware (updates with dark mode)
- Interactive and scalable
- Rendered client-side

### 💻 Code Blocks
- Copy button on hover
- Syntax highlighting
- Responsive horizontal scroll
- Line preservation

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Astro** | Static site generator | 4.16.19 |
| **Mermaid.js** | Diagram rendering | 11.12.1 |
| **TypeScript** | Type safety | 5.8.2 |
| **Node.js** | Runtime | 18+ |

## 📖 Usage Guide

### Adding New Chapters

1. Create new `.astro` file in `src/pages/chapters/`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="Chapter X: Title" 
  description="Chapter description"
  currentPage="/chapters/XX-slug"
>
  <article>
    <h1>Chapter Title</h1>
    <!-- Content here -->
  </article>
</BaseLayout>
```

2. Add to navigation in `src/layouts/BaseLayout.astro`

### Adding Diagrams

```html
<div class="diagram-container">
  <pre class="mermaid">
    graph LR
      A[Start] --> B[Process]
      B --> C[End]
  </pre>
</div>
```

### Adding Callouts

```html
<div class="callout info">
  <div class="callout-title">📚 Note</div>
  <p>Your message here</p>
</div>

<!-- Types: info, warning, best-practice, error -->
```

## 🌐 Deployment

### GitHub Pages
Already configured! Deployed at: https://nchand02.github.io/AIConcepts

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://nchand02.github.io',
  base: '/AIConcepts',
});
```

### Netlify / Vercel
- Build command: `npm run build`
- Publish directory: `dist`
- Framework preset: Astro

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- 📦 **Bundle Size**: < 50KB JavaScript (excluding Mermaid)
- 🚀 **First Contentful Paint**: < 1s
- ⏱️ **Time to Interactive**: < 2s

## 📝 Content Quality

All content has been **professionally validated**:
- ✅ 95/100 accuracy score
- ✅ Cross-validated against 50+ research papers
- ✅ Verified against official documentation
- ✅ Current with 2024-2025 AI landscape

See `COMPREHENSIVE_VALIDATION_REPORT.md` for detailed audit.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

### Areas for Contribution
- Additional chapters or topics
- Improved diagrams and visualizations
- Code examples and exercises
- Translations
- Bug fixes

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Navdeep Singh Chander**
- Website: [https://nchand02.github.io/bio/](https://nchand02.github.io/bio/)
- GitHub: [@nchand02](https://github.com/nchand02)

## 🙏 Acknowledgments

- Research papers and academic sources for technical accuracy
- Open-source community for tools and libraries
- AI research labs: OpenAI, Anthropic, Google, Meta, NVIDIA

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/nchand02.github.io/AIConcepts/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/nchand02.github.io/AIConcepts/discussions)

---

⭐ **Star this repository if you find it helpful!**

Built with ❤️ for the AI community | Last Updated: January 2026
