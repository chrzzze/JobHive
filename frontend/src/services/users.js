import axios from 'axios'
const baseURL = 'http://localhost:3001/'

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
    }).then(response => response.data)
}
const signupAdmin = (first_name, middle_name, last_name, email, password, admin_position, department, contact_no) => {
    return axios.post(baseURL + 'auth/signup', {
        first_name,
        middle_name,
        last_name,
        email,
        password,
        admin_position,
        department,
        contact_no,
        user_type: 'admin'
    }).then(response => response.data)
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
    }).then(response => response.data)
}


const login = (email, password) => {
    return axios.post(baseURL + 'auth/login', {
        email,
        password
    }).then(response => response.data)
}

export default {signupStudent, signupAdmin, signupCompany, login}