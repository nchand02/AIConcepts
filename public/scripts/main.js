// Main JavaScript for AI Learning Portal
// Handles theme toggle, search, mobile menu, and interactive features

(function() {
  'use strict';

  // ======================
  // Theme Toggle
  // ======================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Dispatch custom event for Mermaid theme update
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: newTheme } 
    }));
    
    // Reload mermaid diagrams if present
    if (typeof mermaid !== 'undefined') {
      setTimeout(() => {
        const diagrams = document.querySelectorAll('.mermaid');
        diagrams.forEach(diagram => {
          const svg = diagram.querySelector('svg');
          if (svg) {
            // Re-render mermaid with new theme
            mermaid.render(`mermaid-${Date.now()}`, diagram.textContent).then(result => {
              diagram.innerHTML = result.svg;
            });
          }
        });
      }, 100);
    }
  });

  // ======================
  // Mobile Menu Toggle
  // ======================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  mobileMenuToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar?.contains(e.target) && !mobileMenuToggle?.contains(e.target)) {
        sidebar?.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      }
    }
  });

  // ======================
  // Search Functionality
  // ======================
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Simple in-memory search index
  let searchIndex = [];
  
  // Build search index from page content
  function buildSearchIndex() {
    const chapters = document.querySelectorAll('article h1, article h2, article h3, article p');
    let currentChapter = '';
    let currentSection = '';
    
    chapters.forEach(element => {
      if (element.tagName === 'H1') {
        currentChapter = element.textContent;
      } else if (element.tagName === 'H2') {
        currentSection = element.textContent;
      }
      
      if (element.textContent.length > 20) {
        searchIndex.push({
          title: currentSection || currentChapter,
          chapter: currentChapter,
          content: element.textContent,
          type: element.tagName,
          url: window.location.pathname
        });
      }
    });
  }
  
  // Perform search
  function performSearch(query) {
    if (!query || query.length < 2) {
      searchResults.innerHTML = '<div class="search-empty">Type at least 2 characters to search...</div>';
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item => 
      item.content.toLowerCase().includes(lowerQuery) ||
      item.title.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }
    
    searchResults.innerHTML = results.map(result => {
      const snippet = highlightText(result.content.substring(0, 150), query);
      return `
        <div class="search-result">
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-snippet">${snippet}...</div>
        </div>
      `;
    }).join('');
  }
  
  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  searchToggle?.addEventListener('click', () => {
    searchModal?.classList.toggle('hidden');
    if (!searchModal?.classList.contains('hidden')) {
      searchInput?.focus();
      if (searchIndex.length === 0) {
        buildSearchIndex();
      }
    }
  });
  
  searchInput?.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });
  
  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchModal?.classList.add('hidden');
    }
  });
  
  // Close search when clicking outside
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.add('hidden');
    }
  });

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ======================
  // Copy Code Blocks
  // ======================
  document.querySelectorAll('pre code').forEach(block => {
    const wrapper = block.parentElement;
    if (wrapper && wrapper.tagName === 'PRE') {
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.textContent = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('copied');
          setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          copyButton.textContent = 'Error';
        }
      });
      
      wrapper.style.position = 'relative';
      wrapper.appendChild(copyButton);
    }
  });

  // ======================
  // Table of Contents (Auto-generate)
  // ======================
  function generateTableOfContents() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) return;
    
    // Check if TOC already exists
    if (document.querySelector('.toc')) return;
    
    const toc = document.createElement('nav');
    toc.className = 'toc';
    toc.innerHTML = '<h4>On This Page</h4><ul class="toc-list"></ul>';
    const list = toc.querySelector('.toc-list');
    
    headings.forEach((heading, index) => {
      // Add ID if doesn't exist
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
      
      const li = document.createElement('li');
      li.className = heading.tagName === 'H3' ? 'toc-item-h3' : 'toc-item-h2';
      
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, `#${heading.id}`);
      });
      
      li.appendChild(a);
      list.appendChild(li);
    });
    
    // Insert TOC after first h1
    const h1 = article.querySelector('h1');
    if (h1 && h1.nextElementSibling) {
      h1.parentNode.insertBefore(toc, h1.nextElementSibling);
    }
  }
  
  // Generate TOC on load
  if (document.querySelector('article')) {
    generateTableOfContents();
  }

  // ======================
  // Scroll Progress Indicator
  // ======================
  function updateScrollProgress() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = article.offsetHeight;
    const scrollTop = window.scrollY;
    const articleTop = article.offsetTop;
    
    const progress = Math.min(100, Math.max(0, 
      ((scrollTop - articleTop) / (documentHeight - windowHeight)) * 100
    ));
    
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${progress}%`;
  }
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  // ======================
  // Collapsible Sections (for long pages)
  // ======================
  document.querySelectorAll('.collapsible-section').forEach(section => {
    const header = section.querySelector('.collapsible-header');
    if (header) {
      header.addEventListener('click', () => {
        section.classList.toggle('collapsed');
      });
    }
  });

  // ======================
  // External Link Icons
  // ======================
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      // Add external link icon
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon';
        icon.innerHTML = ' ↗';
        link.appendChild(icon);
      }
    }
  });

  // ======================
  // Print Styles
  // ======================
  window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.collapsible-section.collapsed').forEach(section => {
      section.classList.remove('collapsed');
    });
  });

  // ======================
  // Keyboard Navigation
  // ======================
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchToggle?.click();
    }
    
    // Ctrl/Cmd + / for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      themeToggle?.click();
    }
  });

  // ======================
  // Accessibility: Focus Management
  // ======================
  // Trap focus in modal when open
  searchModal?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusableElements = searchModal.querySelectorAll('input, button, a');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  // ======================
  // Initialize
  // ======================
  console.log('AI Learning Portal initialized');
  console.log('Keyboard shortcuts: Ctrl+K (search), Ctrl+/ (theme)');
})();
