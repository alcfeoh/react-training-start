import { test, expect } from '@playwright/test';

/**
 * Reference test: this one passes on a freshly cloned repository,
 * before any of the labs have been completed. Use it to check that
 * your Playwright set-up works, and as a template for cart.spec.ts.
 */
test('the application starts', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/React App/);
  await expect(page.getByRole('main')).toBeVisible();
});

test('the license plate API answers', async ({ request }) => {
  const response = await request.get('http://localhost:8000/data');

  expect(response.ok()).toBeTruthy();
  expect((await response.json()).length).toBeGreaterThan(0);
});
