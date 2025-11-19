#!/usr/bin/env python3
import re
import sys

def fix_code_blocks(content):
    """Wrap code blocks containing { or < with template literals"""
    
    # Pattern to match <pre><code>...</code></pre> blocks
    pattern = r'(<pre><code>)(.*?)(</code></pre>)'
    
    def replacer(match):
        opening, code, closing = match.groups()
        
        # Check if code contains { or < that needs escaping
        if '{' in code or ('<' in code and not code.startswith('{`')):
            # Already wrapped?
            if code.startswith('{`') and code.endswith('`}'):
                return match.group(0)
            # Wrap it
            return f'{opening}{{`{code}`}}{closing}'
        return match.group(0)
    
    return re.sub(pattern, replacer, content, flags=re.DOTALL)

if __name__ == '__main__':
    filepath = sys.argv[1]
    with open(filepath, 'r') as f:
        content = f.read()
    
    fixed = fix_code_blocks(content)
    
    if fixed != content:
        with open(filepath, 'w') as f:
            f.write(fixed)
        print(f"Fixed: {filepath}")
    else:
        print(f"No changes: {filepath}")
