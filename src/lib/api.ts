import axios from "axios"

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可在此添加 token 等认证信息
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 统一错误处理
    console.error("API Error:", error)
    return Promise.reject(error)
  }
)
