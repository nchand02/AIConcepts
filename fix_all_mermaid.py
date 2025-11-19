#!/usr/bin/env python3
import re
import glob

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Pattern: <pre class="mermaid">\n...content...\n      </pre>
    # Replace with: <pre class="mermaid" set:html={`...content...\n      `} />
    
    pattern = r'<pre class="mermaid">\n(.*?)\n      </pre>'
    
    def replacer(match):
        inner = match.group(1)
        return f'<pre class="mermaid" set:html={{`{inner}\n      `}} />'
    
    content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed: {filepath}")
        return True
    return False

files = glob.glob('/Users/navdeepsinghchander/ws-IntelliJ/AIConcepts/src/pages/chapters/0[6-9]-*.astro')
files += glob.glob('/Users/navdeepsinghchander/ws-IntelliJ/AIConcepts/src/pages/chapters/1[0-4]-*.astro')

for f in sorted(files):
    fix_file(f)
