const API_URL = "http://127.0.0.1:5000";

export const getToken = () => localStorage.getItem("token");

export const authFetch = (url, options = {}) => {
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });
};