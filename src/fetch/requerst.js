import 'isomorphic-fetch';

export default function requestBuildOnIsomorphicBuildOnWhatwg(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => { controller.abort(); },
    options.timeout || 6000,
  );
  const defaultOptions = {
    credentials: 'include',
    signal: controller.signal,
  };
  const newOptions = {
    ...defaultOptions,
    ...options,
  };
  if (newOptions.method === 'POST' || newOptions === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.name = response.status;
      try {
        error.response = response.json();
      } catch (e) {
        error.response = response.text();
      }
      throw error;
    })
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204 || response.status === 205) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      clearTimeout(timeout);
    });
}
