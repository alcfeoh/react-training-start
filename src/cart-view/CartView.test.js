import React from 'react';
import {getCartContents} from "../cart-service/cart-service";

vi.mock('../cart-service/cart-service', () =>
	import('../cart-service/__mocks__/cart-service.js')
);

test('returns the cart contents', () => {
	expect.assertions(1);
	return expect(getCartContents()).resolves.toHaveLength(0);
});
