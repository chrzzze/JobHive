import axios from 'axios'
const baseURL = 'http://localhost:5173/'

const signupStudent = (first_name, middle_name, last_name, email, password, student_number, course_enrolled) => {
    return axios.post(baseURL + 'auth/signup', {
        first_name,
        middle_name,
        last_name,
        email,
        password,
        student_number,
        course_enrolled,
        user_type: 'student'
    })
}
const signupAdmin = (name, email, password, role) => {
    return axios.post(baseURL + 'auth/signup', {
        name,
        email,
        password,
        role
    })
}
const signupCompany = (name, email, password, brn, industry, website, location, contact_no) => {
    return axios.post(baseURL + 'auth/signup', {
        name,
        email,
        password,
        brn,
        industry,
        website,
        location,
        contact_no,
        user_type: 'company'
    })
}


const login = (email, password) => {
    return axios.post(baseURL + 'auth/login', {
        email,
        password
    })
}

export default {signupStudent, signupAdmin, signupCompany, login}