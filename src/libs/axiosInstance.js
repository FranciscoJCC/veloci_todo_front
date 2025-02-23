import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {},
})

axiosInstance.interceptors.request.use(
  async (config) => {
    //To-Do Agregar token header
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
