# Lab E2E1 — End-to-end testing with Playwright

Component tests (React Testing Library) run against a fake DOM. End-to-end
tests run the real thing: a real browser, real routing, the real API.

## Set-up

Playwright is already listed in `package.json`. Install the browsers once:

```bash
npm install
npx playwright install chromium
```

## Running the tests

```bash
npm run e2e         # headless, in the terminal
npm run e2e:ui      # the time-travel debugger, one step at a time
```

Both commands start the two servers for you — the license plate API on port
8000 and the React dev server on port 3000 — see `playwright.config.ts`.
Nothing to start by hand.

## What is in this folder

| File | What it is |
|---|---|
| `smoke.spec.ts` | Two tests that pass on a fresh clone. Use them to check your set-up, and as a template. |
| `cart.spec.ts` | **The lab.** Four TODOs to fill in. |

## The lab

`cart.spec.ts` tests the feature you built in the previous labs: adding a
license plate to the cart, then finding it in the cart page.

1. Click the **Add to cart** button of the first license plate.
2. Navigate to the cart with the **My cart** link.
3. Assert that the plate is listed there.
4. **BONUS** — make the second test pass: `page.route()` intercepts the call
   to `/data` so the test runs without the API server.

Rules of the game:

- **User-facing locators only**: `getByRole`, `getByLabel`, `getByText`. No
  CSS selectors, no `data-testid`. A test written against the accessible name
  survives a refactoring of the markup; a test written against
  `.btn-primary-2` survives nothing.
- **No `waitForTimeout`.** Playwright locators and `expect()` retry on their
  own. If you find yourself adding a sleep, the locator is wrong.

## Useful commands

```bash
npx playwright codegen localhost:3000   # record clicks into a draft test
npx playwright show-trace trace.zip     # open the trace of a failed run
npx playwright test --debug             # step through in a real browser
```

## A note on the API

The application talks to `lp-store-server` on `http://localhost:8000`:

| Call | What it does |
|---|---|
| `GET /data` | the list of license plates |
| `GET /cart` | the current cart contents |
| `PUT /cart/:id` | add a plate to the cart |
| `DELETE /cart/:id` | remove a plate from the cart |

The cart lives in the server's memory, so it is shared by every test. Keep
that in mind when you make the tests run in parallel.
