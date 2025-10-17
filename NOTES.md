Repository notes and quick fixes

Purpose

- Keep small notes and recommendations for reviewers and future edits.

Accessibility & semantics

- All interactive links include `rel="noopener noreferrer"` and `target="_blank"` — good.
- Avatar `alt` text is present. Consider using the full name as alt text for clarity.
- Ensure color contrast is sufficient on the chosen dark background (`#061630`) when the card has translucent white; run a contrast check.

Styling observations

- Layout uses Flexbox for smaller screens and CSS Grid for >=621px. This matches `README.md`'s technologies (Flexbox, Grid).
- The card background currently uses partial transparency (`rgba(255,255,255,0.534)`) on a dark background. If readability issues appear, use a fully opaque background or increase contrast.
- Avatar is square with a small radius — if you prefer a circular avatar, set `border-radius: 50%` on `img`.

Suggested low-risk improvements

- Add a visible focus style for links (already present) and for any future buttons.
- Limit the max width of the profile text column for improved readability on very wide screens (e.g., `max-width: 640px` on the content column).

Next automation steps

- Add a CI job (GitHub Actions) that runs a Playwright smoke test opening `index.html` via a simple static server and verifies the test script in `TESTS.md`.
- Add a `package.json` and `npm test` script if you want to introduce Node-based unit tests (jsdom) later.

Contact

- If you want, I can create the Playwright test and a minimal Github Actions workflow to run it.

File: `NOTES.md`
