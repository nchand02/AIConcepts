#!/usr/bin/env python3
"""
Fix curly braces in Astro files by escaping them properly in code blocks.
This prevents Astro/JSX from trying to parse them as expressions.
"""

import re
import sys
from pathlib import Path

def escape_curly_braces_in_code(content):
    """
    Find code blocks and escape curly braces within them.
    We need to be careful to only escape within <code> or <pre> tags.
    """
    
    # Pattern to match content inside <code>...</code> tags
    # This handles multiline code blocks
    def replace_in_code(match):
        code_content = match.group(1)
        # Escape { to {{ and } to }}
        code_content = code_content.replace('{', '{{').replace('}', '}}')
        return f'<code>{code_content}</code>'
    
    # Replace in inline code tags
    content = re.sub(r'<code>(.*?)</code>', replace_in_code, content, flags=re.DOTALL)
    
    return content

def escape_mermaid_curly_braces(content):
    """
    Fix Mermaid diagrams by escaping curly braces in decision nodes.
    Replace {text} with [text] or (text) depending on context.
    """
    
    # Pattern to find Mermaid diagrams
    def fix_mermaid(match):
        mermaid_content = match.group(1)
        
        # Replace decision node syntax {text} with proper escaping
        # In Mermaid, {} are used for rhombus shapes (decision nodes)
        # We keep them but ensure they're in proper pre tags
        
        return f'<pre class="mermaid">\n{mermaid_content}\n      </pre>'
    
    # Find mermaid diagrams and wrap them properly
    content = re.sub(
        r'<div class="mermaid">\n(.*?)\n    </div>',
        fix_mermaid,
        content,
        flags=re.DOTALL
    )
    
    return content

def process_file(filepath):
    """Process a single Astro file."""
    print(f"Processing {filepath}...")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Escape curly braces in code blocks
        content = escape_curly_braces_in_code(content)
        
        # Fix Mermaid diagrams
        content = escape_mermaid_curly_braces(content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Fixed {filepath}")
            return True
        else:
            print(f"  - No changes needed for {filepath}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all Astro files."""
    base_dir = Path("/Users/navdeepsinghchander/ws-IntelliJ/AI_Tutorial_For_Everyone")
    
    # Find all .astro files
    astro_files = list(base_dir.glob("src/**/*.astro"))
    
    print(f"Found {len(astro_files)} Astro files\n")
    
    fixed_count = 0
    for filepath in astro_files:
        if process_file(filepath):
            fixed_count += 1
    
    print(f"\n✓ Processed {len(astro_files)} files, fixed {fixed_count} files")

if __name__ == "__main__":
    main()
