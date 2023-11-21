import axios from "axios";

const API_URL = 'http://185.196.213.95:8080/api'
// const API_URL = 'http://localhost:8080/api'

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
        return Promise.reject(error)
    }
)

export default instance