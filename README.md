# Thinker Toolkit

> **Protocol-driven engineering skills runtime for AI-assisted development.**  
> Official Website: [thinkerlab.tech](https://thinkerlab.tech)

Thinker Toolkit injects battle-tested engineering disciplines directly into your everyday AI coding assistants (Claude Code, Cursor, VS Code, Windsurf, Google Antigravity).

No proprietary editor lock-in, no synthetic guesswork — only verified, reproducible engineering.

---

## ⚡ Quick Start

### Option 1: Run instantly with npx (No install needed)
```bash
npx thinker-toolkit init
```

### Option 2: Install globally
```bash
npm install -g thinker-toolkit
thinker init
```

---

## 🛠 Commands

### `thinker init`
Interactive workspace setup. Detects your project framework (Next.js, Vite, Python, etc.) and connected IDE configurations, then safely injects the relevant protocols.
```bash
thinker init
```
Pass `-y` / `--yes` to accept sensible defaults non-interactively:
```bash
thinker init --yes
```

### `thinker integrate --target <ide>`
Inject protocols directly into a specific environment:
```bash
thinker integrate --target cursor
thinker integrate --target claude
thinker integrate --target vscode
thinker integrate --target windsurf
thinker integrate --target antigravity
```

### `thinker list`
List all bundled skills and invariant protocols:
```bash
thinker list
```

### `thinker verify`
Run pre-flight invariant checks, TypeScript verification, regression test barriers, and git status check before shipping:
```bash
thinker verify
thinker verify --strict
```

---

## 📦 Bundled Protocols

1. **Systematic Debugging**: Rigorous 4-step root cause analysis (Hypothesis → Trace Isolation → Reproduction Verification → Regression Barrier) before touching code.
2. **Test-Driven Development (TDD)**: Enforces writing failing unit/integration tests before writing implementation code.
3. **Verification Before Completion**: Automated pre-flight checks (lint, types, tests, builds) before claiming any task is resolved.
4. **Subagent Worktree Isolation**: Orchestrates parallel subagents in independent Git worktrees to prevent state collisions.

---

## 🔒 Safety First
Thinker Toolkit never truncates or destroys existing developer configurations. If `.cursorrules` or `CLAUDE.md` already exists, an automatic `.bak` backup is created before applying updates.

---

## 📄 License
MIT © [Thinker Labs](https://thinkerlab.tech)
