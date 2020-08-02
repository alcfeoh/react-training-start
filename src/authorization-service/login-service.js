const BASE_URL = 'http://localhost:8000';

export function login(username, password) {
	return fetch(BASE_URL + '/login', {method: 'PUT', body: JSON.stringify({ username, password})})
		.then(response => response.json());
	// Example: {token: "1abcd21atsampletoken21"}
}