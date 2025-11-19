/**
 * Main JavaScript Functionality
 * Handles deep dive sections, diagrams, and interactive elements
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize Deep Dive expandable sections
        initializeDeepDive();
        
        // Initialize Mermaid diagrams
        initializeMermaid();
        
        // Add copy buttons to code blocks
        initializeCodeCopy();
        
        // Add scroll-to-top button
        initializeScrollToTop();
        
        // Initialize AI chat widget placeholder
        initializeAIWidget();
    });
    
    /**
     * Deep Dive Section Toggle
     */
    function initializeDeepDive() {
        const deepDiveSections = document.querySelectorAll('.deep-dive');
        
        deepDiveSections.forEach(section => {
            const header = section.querySelector('.deep-dive-header');
            if (!header) return;
            
            header.addEventListener('click', function() {
                section.classList.toggle('expanded');
                const isExpanded = section.classList.contains('expanded');
                header.setAttribute('aria-expanded', isExpanded);
            });
            
            // Add keyboard support
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }
    
    /**
     * Initialize Mermaid Diagrams
     */
    function initializeMermaid() {
        if (typeof mermaid !== 'undefined') {
            const isDarkMode = document.body.classList.contains('dark-mode');
            mermaid.initialize({
                startOnLoad: true,
                theme: isDarkMode ? 'dark' : 'default',
                securityLevel: 'loose',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis'
                }
            });
        }
    }
    
    /**
     * Add Copy Button to Code Blocks
     */
    function initializeCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const pre = block.parentElement;
            const button = document.createElement('button');
            button.className = 'code-copy-button';
            button.textContent = '📋 Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', async function() {
                const code = block.textContent;
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = '✓ Copied!';
                    setTimeout(() => {
                        button.textContent = '📋 Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    button.textContent = '✗ Failed';
                    setTimeout(() => {
                        button.textContent = '📋 Copy';
                    }, 2000);
                }
            });
            
            // Add button to pre element
            pre.style.position = 'relative';
            button.style.position = 'absolute';
            button.style.top = '0.5rem';
            button.style.right = '0.5rem';
            button.style.padding = '0.25rem 0.75rem';
            button.style.background = 'var(--accent-primary)';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            button.style.fontSize = '0.875rem';
            button.style.transition = 'all 0.2s ease';
            
            pre.appendChild(button);
        });
    }
    
    /**
     * Scroll to Top Button
     */
    function initializeScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.id = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--accent-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            box-shadow: var(--shadow-md);
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * Initialize AI Chat Widget Placeholder
     */
    function initializeAIWidget() {
        const widget = document.getElementById('ai-chat-widget-placeholder');
        if (!widget) return;
        
        widget.addEventListener('click', function() {
            // Placeholder for future AI Studio integration
            alert('AI Chat Widget\n\nThis is a placeholder for future Google AI Studio integration.\n\nYou can integrate your custom AI chat interface here.');
        });
        
        // Add tooltip
        widget.setAttribute('title', 'AI Assistant (Coming Soon)');
    }
    
    /**
     * Utility: Add IDs to headings for anchor links
     */
    function addHeadingIds() {
        const headings = document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4');
        headings.forEach(heading => {
            if (!heading.id) {
                const id = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                heading.id = id;
            }
        });
    }
    
    // Auto-add IDs to headings
    addHeadingIds();
})();
