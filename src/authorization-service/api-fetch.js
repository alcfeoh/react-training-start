const BASE_URL = 'http://localhost:8000';

/**
 * BONUS - attach the token in one place, and handle the 401 once.
 *
 * The rule that matters: retry at most once. A refresh that fails and then
 * retries the same call is how you get an infinite loop against your own
 * identity provider.
 *
 * `getAccessToken` and `onUnauthenticated` are passed in rather than
 * imported, so this file has no idea React exists - which is also what
 * makes it trivial to test.
 */
export function createApi({ getAccessToken, onUnauthenticated }) {
  async function apiFetch(path, options = {}, retry = true) {
    const token = getAccessToken();

    const response = await fetch(BASE_URL + path, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401 && retry) {
      // TODO BONUS - there is no refresh endpoint in this backend, so end
      // the session and let the app send the user to /login.
      // Do NOT call apiFetch again with retry === true.
    }

    return response;
  }

  return { apiFetch };
}
