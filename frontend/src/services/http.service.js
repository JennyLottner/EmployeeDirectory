import Axios from 'axios'

// Base URL for API requests, determined by the environment
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/' : '//localhost:3030/api/'

// Create an Axios instance with credentials support
var axios = Axios.create({
    withCredentials: true
})

// HTTP service methods for making API requests
// Sends get/put/post/delete request to the specified endpoint with optional data
export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

// Function for making API requests
async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })

        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}