# Git Add Force

A VS Code extension that adds `git add --force` to the right-click context menu, allowing you to stage files that are normally ignored by `.gitignore`.

## Features

- Right-click any file or folder in the Explorer to force add it to git
- Supports multi-select (select multiple files/folders and force add them all at once)
- Also available from the editor tab context menu and Source Control panel

## Usage

1. Right-click on a file or folder in the Explorer
2. Select **Git: Add --force**
3. The file(s) will be staged, bypassing `.gitignore` rules

## Requirements

- Git must be installed and available in your PATH

## Release Notes

### 0.0.1

Initial release with basic `git add --force` functionality.
