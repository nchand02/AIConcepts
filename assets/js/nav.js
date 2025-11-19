/**
 * Navigation and Mobile Menu Functionality
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', function() {
                mainNav.classList.toggle('mobile-active');
                const isExpanded = mainNav.classList.contains('mobile-active');
                mobileToggle.setAttribute('aria-expanded', isExpanded);
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.site-header')) {
                    mainNav.classList.remove('mobile-active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Set active navigation link based on current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (currentPath === linkPath || 
                (currentPath.includes('/chapters/') && linkPath.includes('/chapters/'))) {
                link.classList.add('active');
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, this.getAttribute('href'));
                }
            });
        });
        
        // Table of contents active section tracking
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -35% 0px',
            threshold: 0
        };
        
        const headings = document.querySelectorAll('h2[id], h3[id]');
        const tocLinks = document.querySelectorAll('.toc-list a');
        
        if (headings.length > 0 && tocLinks.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        tocLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);
            
            headings.forEach(heading => observer.observe(heading));
        }
    });
})();
