import axios from "axios"

const dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0

const customAxios = axios.create({
    baseURL: dev_mode ? '/api/' : '/api/'
})

export default customAxios
