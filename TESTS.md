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

## Tests — About Page

This section provides manual checks and a small console test you can run if your repository includes an About page (for example `about.html`) or an About section on the main page.

Manual checklist

- Open `about.html` (or the page/section that contains your About content).
- The page should contain a clear heading (e.g. `h1` or `h2`) with the user's full name.
- There should be a short biography paragraph that is readable and uses semantic HTML.
- Any skills/technologies list should be present (ul/ol) and include at least one item.
- Profile image (if present) should have meaningful `alt` text.
- Links to external profiles (GitHub, LinkedIn, Twitter/X) should be present and include `target="_blank"` and `rel="noopener noreferrer"`.

Browser console quick-test — About
Paste into DevTools Console while viewing the About page/section:

```javascript
(function runAboutTests() {
  const q = (s) => document.querySelector(s);
  const pass = (m) => console.log("PASS:", m);
  const fail = (m) => console.error("FAIL:", m);

  const heading = q('main h1, main h2, [data-testid="about-heading"]');
  heading ? pass("About heading present") : fail("About heading missing");

  const bio = q('main p, [data-testid="about-bio"]');
  bio && bio.textContent.trim().length > 20
    ? pass("Bio present and non-empty")
    : fail("Bio missing or too short");

  const skills = document.querySelectorAll(
    '[data-testid="about-skills"] li, main ul.skills li'
  );
  skills.length > 0
    ? pass("skills list has items")
    : fail("skills list missing or empty");

  const links = document.querySelectorAll(
    'a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="x.com"]'
  );
  links.length > 0
    ? pass("external profile links found")
    : fail("no external links found");
})();
```

## Tests — Contact Page

This section is for pages with contact forms (for example `contact.html` or a contact section on the main page).

Manual checklist

- Open the Contact page or section.
- Confirm a form exists with at least: name input, email input, message textarea, and a submit button.
- Inputs should have `name` attributes and appropriate `type` (`email` for email).
- Required fields should be enforced either via `required` attribute or client-side validation.
- On submission with valid data, a success message should appear (toast, inline message, or redirect).

Browser console quick-test — Contact
Paste into DevTools Console while viewing the Contact page/section (the snippet will attempt to find a form and run a basic validation flow):

```javascript
(function runContactTests() {
  const pass = (m) => console.log("PASS:", m);
  const fail = (m) => console.error("FAIL:", m);
  const form = document.querySelector('form, [data-testid="contact-form"]');
  if (!form) return fail("Contact form not found");
  pass("Contact form found");

  const name = form.querySelector(
    'input[name="name"], input[id*="name"], [data-testid="contact-name"]'
  );
  const email = form.querySelector(
    'input[type="email"], input[name="email"], [data-testid="contact-email"]'
  );
  const message = form.querySelector(
    'textarea, [data-testid="contact-message"]'
  );
  const submit = form.querySelector(
    'button[type="submit"], input[type="submit"], button'
  );

  name ? pass("name input found") : fail("name input missing");
  email ? pass("email input found") : fail("email input missing");
  message ? pass("message textarea found") : fail("message textarea missing");
  submit ? pass("submit button found") : fail("submit button missing");

  // non-destructive submit test: fill fields and dispatch submit event, but prevent network requests
  const originalFetch = window.fetch;
  window.fetch = () => Promise.resolve({ ok: true });
  try {
    if (name) name.value = name.value || "Test User";
    if (email) email.value = email.value || "test@example.com";
    if (message) message.value = message.value || "Hello from automated test.";

    let submitted = false;
    const onSubmit = (e) => {
      submitted = true;
      e.preventDefault();
    };
    form.addEventListener("submit", onSubmit, { once: true });
    submit.click();

    setTimeout(() => {
      submitted
        ? pass("form submit event fired")
        : fail("form submit not fired");
      // try to detect a success message
      const success = document.querySelector(
        '.success, [data-testid="contact-success"]'
      );
      success
        ? pass("success message found")
        : console.warn(
            "no visible success message detected (check server or client behavior)"
          );
      window.fetch = originalFetch;
    }, 700);
  } catch (e) {
    window.fetch = originalFetch;
    console.error("Contact test error", e);
  }
})();
```

## Recommended automated next steps

- Add a small Playwright / Puppeteer test to verify layout and time update in CI (optional).
- Add visual-regression tests (screenshots) if you plan to change styles frequently.

---

File: `TESTS.md`
