#!/usr/bin/env python3
"""
Fix Astro code blocks by converting them to use set:html to prevent JSX parsing of curly braces.
Converts: <pre><code>...</code></pre>
To: <pre set:html={`<code>...</code>`} />
"""
import re
import os
from pathlib import Path

def escape_backticks(text):
    """Escape backticks in code content for template literal"""
    return text.replace('`', '\\`').replace('${', '\\${')

def convert_code_block(match):
    """Convert a code block to use set:html"""
    code_content = match.group(1)
    # Escape backticks and template literal syntax
    escaped_content = escape_backticks(code_content)
    return f'<pre set:html={{`<code>{escaped_content}</code>`}} />'

def convert_mermaid_block(match):
    """Convert a Mermaid diagram to use set:html"""
    mermaid_content = match.group(1)
    # Escape backticks and template literal syntax
    escaped_content = escape_backticks(mermaid_content)
    return f'<pre class="mermaid" set:html={{`{escaped_content}`}} />'

def process_file(filepath):
    """Process a single Astro file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match <pre><code>...</code></pre> blocks
    code_pattern = r'<pre><code>(.*?)</code></pre>'
    content = re.sub(code_pattern, convert_code_block, content, flags=re.DOTALL)
    
    # Pattern to match <pre class="mermaid">...</pre> blocks  
    mermaid_pattern = r'<pre class="mermaid">\s*(.*?)</pre>'
    content = re.sub(mermaid_pattern, convert_mermaid_block, content, flags=re.DOTALL)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    # Process all chapter files and index
    files_to_process = []
    
    # Add chapter files
    chapters_dir = Path('src/pages/chapters')
    if chapters_dir.exists():
        files_to_process.extend(chapters_dir.glob('*.astro'))
    
    # Add index file
    index_file = Path('src/pages/index.astro')
    if index_file.exists():
        files_to_process.append(index_file)
    
    if not files_to_process:
        print(f"❌ No .astro files found")
        return
    
    print(f"📝 Processing {len(files_to_process)} Astro files...")
    
    fixed_count = 0
    for filepath in files_to_process:
        if process_file(filepath):
            print(f"✓ Fixed: {filepath.name}")
            fixed_count += 1
        else:
            print(f"  Skipped (no changes): {filepath.name}")
    
    print(f"\n✨ Complete! Fixed {fixed_count}/{len(files_to_process)} files")

if __name__ == '__main__':
    main()
