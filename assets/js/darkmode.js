/**
 * Dark Mode Toggle Functionality
 * Manages theme switching and persistence
 */

(function() {
    'use strict';
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        
        if (!themeToggle) return;
        
        // Update button icon based on current theme
        updateThemeIcon();
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            
            // Update icon
            updateThemeIcon();
        });
        
        function updateThemeIcon() {
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    });
})();
