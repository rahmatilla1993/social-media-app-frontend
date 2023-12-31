import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: API_URL
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('auth-token')
    return config
})

instance.interceptors.response.use((config) => {
        return config
    }, (error) => {
        window.localStorage.removeItem('auth-token')
        return Promise.reject(error)
    }
)

export default instance