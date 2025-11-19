// ========================================
// Theme Management
// ========================================

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to light
  let currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  themeToggle?.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Dispatch event for mermaid theme update
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: currentTheme } 
    }));
  });
}

// ========================================
// Mobile Menu Toggle
// ========================================

function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  menuToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const target = e.target;
      if (!sidebar?.contains(target) && !menuToggle?.contains(target)) {
        sidebar?.classList.remove('open');
      }
    }
  });
}

// ========================================
// Search Functionality
// ========================================

function initSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Open search modal
  searchToggle?.addEventListener('click', () => {
    searchModal?.classList.remove('hidden');
    searchInput?.focus();
  });
  
  // Close search modal
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.add('hidden');
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  });
  
  // Keyboard shortcut (Cmd/Ctrl + K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchModal?.classList.remove('hidden');
      searchInput?.focus();
    }
    
    // Close on Escape
    if (e.key === 'Escape') {
      searchModal?.classList.add('hidden');
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  });
  
  // Simple search implementation
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      if (searchResults) searchResults.innerHTML = '';
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
}

function performSearch(query) {
  const searchResults = document.getElementById('search-results');
  if (!searchResults) return;
  
  // Search in current page content
  const content = document.querySelector('.content-inner');
  if (!content) return;
  
  const headings = content.querySelectorAll('h1, h2, h3, h4');
  const paragraphs = content.querySelectorAll('p');
  
  const results = [];
  
  // Search headings
  headings.forEach((heading) => {
    const text = heading.textContent.toLowerCase();
    if (text.includes(query)) {
      results.push({
        type: 'heading',
        text: heading.textContent,
        element: heading
      });
    }
  });
  
  // Search paragraphs
  paragraphs.forEach((para) => {
    const text = para.textContent.toLowerCase();
    if (text.includes(query)) {
      const snippet = getSearchSnippet(para.textContent, query);
      results.push({
        type: 'content',
        text: snippet,
        element: para
      });
    }
  });
  
  // Display results
  if (results.length === 0) {
    searchResults.innerHTML = '<div style="padding: 1rem; color: var(--color-text-secondary);">No results found</div>';
  } else {
    searchResults.innerHTML = results.slice(0, 10).map(result => `
      <div class="search-result" style="padding: 0.75rem; cursor: pointer; border-radius: var(--radius-md); margin-bottom: 0.5rem;" onmouseover="this.style.backgroundColor='var(--color-bg-tertiary)'" onmouseout="this.style.backgroundColor='transparent'" onclick="document.getElementById('search-modal').classList.add('hidden'); document.getElementById('${result.element.id || ''}')?.scrollIntoView({behavior: 'smooth', block: 'center'});">
        <div style="font-weight: 600; margin-bottom: 0.25rem;">${result.type === 'heading' ? '📑' : '📄'} ${highlightText(result.text, query)}</div>
      </div>
    `).join('');
  }
}

function getSearchSnippet(text, query, contextLength = 100) {
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query.toLowerCase());
  
  if (index === -1) return text.substring(0, contextLength) + '...';
  
  const start = Math.max(0, index - contextLength / 2);
  const end = Math.min(text.length, index + query.length + contextLength / 2);
  
  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  return snippet;
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background-color: var(--color-warning); padding: 0.1em 0.2em; border-radius: 0.2em;">$1</mark>');
}

// ========================================
// Collapsible Sections
// ========================================

function initCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible-header');
  
  collapsibles.forEach(header => {
    header.addEventListener('click', () => {
      const collapsible = header.parentElement;
      collapsible?.classList.toggle('open');
    });
  });
}

// ========================================
// Table of Contents (On-page)
// ========================================

function generateTableOfContents() {
  const content = document.querySelector('.content-inner');
  const tocContainer = document.getElementById('table-of-contents');
  
  if (!content || !tocContainer) return;
  
  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) return;
  
  let tocHTML = '<nav class="toc"><ul>';
  
  headings.forEach((heading, index) => {
    const level = heading.tagName === 'H2' ? 2 : 3;
    const id = heading.id || `heading-${index}`;
    heading.id = id;
    
    const indent = level === 3 ? 'margin-left: 1rem;' : '';
    tocHTML += `<li style="${indent}"><a href="#${id}">${heading.textContent}</a></li>`;
  });
  
  tocHTML += '</ul></nav>';
  tocContainer.innerHTML = tocHTML;
}

// ========================================
// Smooth Scroll Enhancement
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, '', href);
      }
    });
  });
}

// ========================================
// Copy Code Blocks
// ========================================

function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(block => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    block.parentNode?.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    
    const button = document.createElement('button');
    button.innerHTML = '📋 Copy';
    button.className = 'copy-code-btn';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.75rem;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: var(--font-size-sm);
      opacity: 0;
      transition: opacity var(--transition-fast);
    `;
    
    wrapper.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });
    
    wrapper.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });
    
    button.addEventListener('click', async () => {
      const code = block.querySelector('code')?.textContent || block.textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        button.innerHTML = '✓ Copied!';
        setTimeout(() => {
          button.innerHTML = '📋 Copy';
        }, 2000);
      } catch (err) {
        button.innerHTML = '✗ Failed';
        setTimeout(() => {
          button.innerHTML = '📋 Copy';
        }, 2000);
      }
    });
    
    wrapper.appendChild(button);
  });
}

// ========================================
// Progress Indicator
// ========================================

function initProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    z-index: 101;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

// ========================================
// Add IDs to headings for linking
// ========================================

function initHeadingIds() {
  const content = document.querySelector('.content-inner');
  if (!content) return;
  
  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach(heading => {
    if (!heading.id) {
      const id = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      heading.id = id;
    }
    
    // Add anchor link
    heading.style.position = 'relative';
    const anchor = document.createElement('a');
    anchor.href = `#${heading.id}`;
    anchor.className = 'heading-anchor';
    anchor.innerHTML = '#';
    anchor.style.cssText = `
      position: absolute;
      left: -1.5rem;
      opacity: 0;
      transition: opacity var(--transition-fast);
      text-decoration: none;
      color: var(--color-primary);
      font-weight: 400;
    `;
    
    heading.addEventListener('mouseenter', () => {
      anchor.style.opacity = '0.5';
    });
    
    heading.addEventListener('mouseleave', () => {
      anchor.style.opacity = '0';
    });
    
    anchor.addEventListener('mouseenter', () => {
      anchor.style.opacity = '1';
    });
    
    heading.style.cursor = 'pointer';
    heading.insertBefore(anchor, heading.firstChild);
  });
}

// ========================================
// Initialize All Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSearch();
  initCollapsibles();
  generateTableOfContents();
  initSmoothScroll();
  initCodeCopy();
  initProgressIndicator();
  initHeadingIds();
  
  console.log('🚀 AI Learning Portal initialized successfully!');
});
