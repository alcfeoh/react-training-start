import { test, expect } from '@playwright/test';

/**
 * LAB E2E1 - An end-to-end test for the cart.
 *
 * These tests run against the application as you have built it in the
 * previous labs: the store on "/", the cart on "/cart", and a
 * "Add to cart" button on every license plate.
 *
 * Run them with:   npm run e2e
 * Or, to watch them step by step:   npm run e2e:ui
 */
test.describe('Cart', () => {

  test('adds a license plate to the cart', async ({ page }) => {
    await page.goto('/');

    // TODO 1 - click the "Add to cart" button of the first license plate.
    // Hint: page.getByRole('button', { name: 'Add to cart' }).first()

    // TODO 2 - navigate to the cart using the "My cart" link.
    // Hint: page.getByRole('link', { name: 'My cart' })

    // TODO 3 - assert that the plate you added is now listed on the page.
    // Hint: await expect(page.getByRole('heading', { name: /license plate/i }).first())
    //         .toBeVisible();

    expect(test.info().errors).toEqual([]); // remove me once the TODOs are done
  });

  /**
   * BONUS - the same test, without a backend server.
   * page.route() intercepts the request the application makes and
   * answers it with data you control.
   */
  test('shows the plates returned by a mocked API', async ({ page }) => {
    await page.route('**/data', route =>
      route.fulfill({
        json: [
          {
            _id: 'test-plate',
            title: '1998 Playwright license plate',
            description: 'A plate that only exists inside this test.',
            picture: 'http://angulartraining.com/plates/CA.png',
            price: 29.99,
            onSale: false,
          },
        ],
      })
    );

    await page.goto('/');

    // TODO 4 - assert that "1998 Playwright license plate" is on the page.
  });
});
