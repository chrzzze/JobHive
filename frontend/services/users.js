import axios from 'axios'
const baseURL = 'http://localhost:5173/'

const signup = (name, email, password, role) => {
    return axios.post(baseURL + 'auth/signup', {
        name,
        email,
        password,
        role
    })
}

const login = (email, password) => {
    return axios.post(baseURL + 'auth/login', {
        email,
        password
    })
}

export default {signup, login}