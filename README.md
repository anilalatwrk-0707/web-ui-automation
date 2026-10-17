# Playwright security-scanning POC

A small TypeScript + Playwright UI automation project for learning GitHub code
scanning (CodeQL), secret scanning, and the dependency graph. The examples under
`src/demo/` are deliberately unsafe training fixtures; do not copy them into a
real application or run them with untrusted input.

## Requirements

- Node.js 20 or newer
- npm

## Run the UI tests

```sh
npm ci
npx playwright install chromium
npm test
```

The tests start a local static demo site automatically. The demo login accepts
any non-empty email and password; it does not authenticate against a service.

## Try code scanning

`.github/workflows/codeql.yml` runs CodeQL on pushes, pull requests, and a
weekly schedule. Enable **Settings > Security > Code security and analysis >
Code scanning** if the repository requires it, then push the branch and inspect
the **Security > Code scanning** page.

The deliberately vulnerable examples are:

- `src/demo/vulnerable-render.ts`: URL query input is written to `innerHTML`
  (cross-site scripting).
- `src/demo/vulnerable-command.ts`: a command-line argument is interpolated
  into a shell command (command injection).

These files are not imported by the demo UI or test suite. They exist only to
give scanners detectable source patterns.

## Try secret scanning safely

`src/demo/training-secret.ts` contains a conspicuously fake marker, not a usable
credential. Provider-specific scanners are not expected to flag it. To test
custom-pattern secret scanning, enable secret scanning for the repository and
add a custom pattern matching this marker, for example:

```regex
TRAINING_API_KEY\s*=\s*"(?P<secret>TRAINING_ONLY_[A-Z0-9_]+)"
```

Push the file and inspect **Security > Secret scanning**. Never put a real
token, password, or provider-shaped fake token in this repository. Custom
pattern availability can depend on repository visibility and GitHub plan.

## Try the dependency graph

`package.json` and the committed `package-lock.json` describe the direct and
transitive npm dependencies. GitHub can parse the lockfile to populate the
repository dependency graph after the repository is pushed. Check
**Insights > Dependency graph**. The dependency review workflow checks changes
to dependencies on pull requests; Dependabot is configured for weekly npm
updates.

## Project layout

```text
.
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       ├── codeql.yml
│       └── dependency-review.yml
├── app/
│   └── index.html
├── scripts/
│   └── serve.mjs
├── src/
│   ├── demo/                 # Isolated, intentionally insecure scan fixtures
│   ├── pages/                # Playwright page objects
│   └── test-data/            # Non-sensitive sample data
├── tests/
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```
