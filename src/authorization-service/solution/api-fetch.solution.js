const BASE_URL = 'http://localhost:8000';

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
      // A real app would refresh here, once, and retry with retry = false.
      // This backend has no refresh endpoint, so the session simply ends.
      onUnauthenticated();
      throw new Error('Session expired');
    }

    return response;
  }

  return { apiFetch };
}
