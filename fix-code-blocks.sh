#!/bin/bash

# Fix Python f-strings and other curly braces in code blocks
# Replace problematic patterns with HTML entities

cd /Users/navdeepsinghchander/ws-IntelliJ/AI_Tutorial_For_Everyone

# Backup files first
for file in src/pages/chapters/*.astro; do
  cp "$file" "$file.bak"
done

# Function to escape curly braces in code/pre blocks
# This is a placeholder - we'll do manual fixes for precision

echo "Files backed up. Ready for manual fixes."
