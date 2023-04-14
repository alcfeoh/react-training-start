const BASE_URL = 'http://localhost:8000';

export function addToCart(plate) {
	return fetch(BASE_URL + '/cart/' + plate._id, {method: 'PUT'})
	.then(response => response.json());
}

export function getCartContents() {
	return fetch(BASE_URL + '/cart', {method: 'GET'})
	.then(response => response.json());
};

export function removeFromCart(plate) {
	return fetch(BASE_URL + '/cart/' + plate._id, {method: 'DELETE'});
}
