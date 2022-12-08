const cart = [];

export function addToCart(plate) {
	cart.push(plate);
	return Promise.resolve();
}

export function getCartContents(plate) {
	return Promise.resolve(cart);
};

export function removeFromCart(plate) {
	const index = cart.findIndex(p => p._id == plate._id);
	cart.splice(index, 1);
	return Promise.resolve();
}
