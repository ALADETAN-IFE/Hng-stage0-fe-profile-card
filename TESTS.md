# Tests — Profile Card

This file lists quick manual checks and a small browser-console test script you can paste into the page's DevTools console to run a few automated assertions.

## Manual checklist

- Open `index.html` in a browser.
- The profile card should be centered on the page.
- On wide screens (≥621px) the avatar should be on the left and the content on the right.
- On narrow screens the card should stack vertically and remain readable.
- The avatar image should be visible and have a meaningful `alt`.
- The user name (`data-testid="test-user-name"`) should be visible.
- The `#user-time` element should show a number and update every second.
- Social links should open in a new tab and include `rel="noopener noreferrer"`.
- Hobbies and Dislikes lists should contain at least one item each.

## Browser console quick-test

Open `index.html`, open DevTools → Console, paste the code below and press Enter.

```javascript
(function runProfileCardTests() {
  const pass = (msg) => console.log("PASS:", msg);
  const fail = (msg) => console.error("FAIL:", msg);
  const q = (s) => document.querySelector(s);

  try {
    q('[data-testid="test-user-name"]')
      ? pass("user name exists")
      : fail("user name missing");
    q('[data-testid="test-user-avatar"]')
      ? pass("avatar exists")
      : fail("avatar missing");

    // time is numeric
    const tEl = q("#user-time");
    if (tEl && !isNaN(Number(tEl.textContent))) pass("user time is numeric");
    else fail("user time not numeric or missing");

    // ensure time updates after ~1s
    if (tEl) {
      const first = tEl.textContent;
      setTimeout(() => {
        const second = tEl.textContent;
        if (second && second !== first) pass("user time updates every second");
        else fail("user time did not update");
      }, 1100);
    }

    const links = document.querySelectorAll(
      '[data-testid="test-user-social-links"] a'
    );
    links.length >= 3
      ? pass("3+ social links present")
      : fail("fewer than 3 social links");

    // link attributes
    links.forEach((a, i) => {
      a.target === "_blank"
        ? pass(`link ${i + 1} has target _blank`)
        : fail(`link ${i + 1} missing target _blank`);
      a.rel.includes("noopener")
        ? pass(`link ${i + 1} has rel`)
        : fail(`link ${i + 1} missing rel noopener`);
    });

    // layout check (best-effort)
    const card = q(".profile-card");
    if (card) {
      const display = getComputedStyle(card).display;
      display
        ? pass(`.profile-card display: ${display}`)
        : fail("cannot read .profile-card display");
    }
  } catch (e) {
    console.error("Test runner error:", e);
  }
})();
```

## Recommended automated next steps

- Add a small Playwright / Puppeteer test to verify layout and time update in CI (optional).
- Add visual-regression tests (screenshots) if you plan to change styles frequently.

---

File: `TESTS.md`
