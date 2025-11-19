#!/usr/bin/env python3
"""Fix mermaid diagram syntax in Astro files to use set:html format"""

import re
import os

def fix_mermaid_in_file(filepath):
    """Convert mermaid diagrams from plain format to set:html format"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match mermaid blocks with escaped newlines
    # Matches: <pre class="mermaid">\n... content ...\n      </pre>
    pattern = r'<pre class="mermaid">\n(.*?)\n      </pre>'
    
    def replace_mermaid(match):
        diagram_content = match.group(1)
        # Remove the leading whitespace and unescape newlines
        lines = diagram_content.split('\\n')
        cleaned_lines = []
        for line in lines:
            # Remove common indentation
            line = line.strip()
            if line:
                cleaned_lines.append(line)
        
        # Join with actual newlines for the template literal
        diagram_clean = '\n    '.join(cleaned_lines)
        
        # Return in set:html format
        return f'<pre class="mermaid" set:html={{`{diagram_clean}\n      `}} />'
    
    # Replace all mermaid blocks
    content = re.sub(pattern, replace_mermaid, content, flags=re.DOTALL)
    
    # Only write if changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    src_dir = '/Users/navdeepsinghchander/ws-IntelliJ/AIConcepts/src/pages/chapters'
    
    # Process chapters 6-15
    chapters = [
        '06-generative-ai.astro',
        '07-embeddings.astro',
        '08-rag.astro',
        '09-fine-tuning.astro',
        '10-multimodal.astro',
        '11-agents.astro',
        '12-tooling.astro',
        '13-infrastructure.astro',
        '14-system-design.astro',
    ]
    
    for chapter in chapters:
        filepath = os.path.join(src_dir, chapter)
        if os.path.exists(filepath):
            if fix_mermaid_in_file(filepath):
                print(f"Fixed: {chapter}")
            else:
                print(f"No changes: {chapter}")

if __name__ == '__main__':
    main()
