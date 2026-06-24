const API_URL = "https://ajtech-fc3f.onrender.com/";

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