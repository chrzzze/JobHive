import axios from 'axios'
const baseURL = 'http://localhost:3001/'

const getCourses = () => {
    return axios.get(`${baseURL}jobs/courses`).then(response => response.data)
}

export default { getCourses }