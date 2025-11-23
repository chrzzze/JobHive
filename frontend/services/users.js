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

export default {signup}