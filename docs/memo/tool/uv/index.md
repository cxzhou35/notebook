
---
comments: true
statistics: false
---

# UV

!!! abstract "Abstract"
    记录一些 uv 相关的内容

## Installation

- macOS and Linux: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Homebrew: `brew install uv`
- Scoop: `scoop install main/uv`
- Cargo: `cargo install --git https://github.com/astral-sh/uv uv`

## Commands

### UV

- Upgrading uv self: `uv self update`
- Uninstallation: `uv cache clean` & `rm ~/.local/bin/uv ~/.local/bin/uvx`

### Python

- Install Python: `uv python install [version]`
- View available Python versions: `uv python list`
- Uninstall a Python version: `uv python uninstall`
