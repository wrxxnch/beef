# Safe Lab modules

The root `config.yaml` keeps `beef.safe_mode: true` by default and defines `beef.safe_lab` limits. These modules are intentionally consent-first and do not implement cross-tab cookie access, persistent location links, remote screen streaming, third-party cloning, or hook injection.

- `masked_cookies` reads `document.cookie` from the current document only after a visible consent prompt. It reports cookie names and fixed-length masks; values are never sent.
- `consented_location` shows a visible opt-in and revoke control, uses `watchPosition`, expires after the configured maximum duration, and sends only bounded coordinates plus audit state.
- `local_screen_preview` calls `getDisplayMedia()` so the browser's native picker is always shown. The stream is rendered locally and is never uploaded or sent to the BeEF panel.
- `safe_page_preview` allows only same-origin paths configured in `beef.safe_lab.clone_allowed_paths`. It removes forms and credential-bearing fields from the preview and does not inject `hook.js`.

The existing offensive or legacy modules in BeEF are not modified by these additions. Test only on pages and participants you own, and keep the default configuration unchanged for laboratory work.
