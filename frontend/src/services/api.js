import axios from "axios"

const API = axios.create({
  baseURL: "https://ajtech-fc3f.onrender.com/api/",
})

// 🔐 Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Optional: global error handling (prevents silent failures)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/admin"
    }
    return Promise.reject(error)
  }
)

export default API