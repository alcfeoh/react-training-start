const BASE_URL = 'http://localhost:8000';

export function addToCart(plate) {
	fetch('http://localhost:8000/cart/' + plate._id, {method: 'PUT'})
	.then(response => response.json())
	.then(data => {});
	return true;
}
