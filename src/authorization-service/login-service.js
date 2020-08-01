const BASE_URL = 'http://localhost:8000';

export async function login(username, password) {
	const data = { "username" : username, "password" : password};
	let output = {};
	await fetch(BASE_URL + '/login', {method: 'PUT', body: JSON.stringify(data)})
		.then(response => response.json())
		.then(data => { output = data; });
	// Example: {token: "1abcd21atsampletoken21"}
	return output;
}