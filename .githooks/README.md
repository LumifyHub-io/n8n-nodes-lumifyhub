# Git Hooks for n8n-nodes-lumifyhub

This directory contains version-controlled git hooks that are automatically installed when you run `npm install`.

## Available Hooks

### pre-commit

Runs before every commit to ensure code quality:

1. **Auto-fix linting issues** - Runs `npm run lint:fix` to automatically fix formatting and style issues
2. **Stage fixed files** - Automatically adds any fixed files to the commit
3. **Verify remaining issues** - Runs `npm run lint` to check for any remaining errors
4. **Block commit if errors remain** - Prevents commits if there are unfixable linting errors

## How It Works

The hook is automatically installed via the `prepare` script in `package.json`, which runs after `npm install`.

### Manual Installation

If needed, you can manually install the hooks:

```bash
npm run prepare
```

Or manually:

```bash
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Bypassing the Hook (Not Recommended)

In rare cases where you need to commit without running the hook:

```bash
git commit --no-verify -m "Your message"
```

**Note:** Only use `--no-verify` when absolutely necessary, as it bypasses all quality checks.

