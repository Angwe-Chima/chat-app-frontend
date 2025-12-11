/* --- utils/api.js --- */
export const API_URL = import.meta.env.PROD
  ? "https://chat-app-backend-u08y.onrender.com"
  : "http://localhost:5000";

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: { 
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data;
};