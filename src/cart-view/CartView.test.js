import React from 'react';
import {getCartContents} from "../cart-service/cart-service";

jest.mock('../cart-service/cart-service');

test('returns the cart contents', () => {
	expect.assertions(1);
	return expect(getCartContents()).resolves.toHaveLength(0);
});
