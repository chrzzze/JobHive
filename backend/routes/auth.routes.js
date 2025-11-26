const express = require('express')
const cors = require("cors") //allow cross origins stuff
const bcrypt = require("bcrypt") //hashing the passwords
const jwt = require("jsonwebtoken") //for token generation
require("dotenv").config() //for using env variables
const router = express.Router()
router.use(express.json())
router.use(cors())

const {verifyToken, requireRole} = require('../middleware/auth.service.js') // yung mga service natin

const db = require("mysql2").createPool({ //connect to xamppp 
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}).promise()

//sign up stuff
router.post('/signup', async (req, res) => {
    try {
        const { email, password, first_name, middle_name, last_name, user_type } = req.body
        console.log("someone's trying to sign up with ", email, " ", password) //merely for logging purposes

        //if user exists
        const[exists] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (exists.length) return res.status(400).json({ message: 'Email already in use :/' })

        //else
        const hash = await bcrypt.hash(password, 10)
        const [userResult] = await db.query('INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)', [email, hash, user_type])
        const userId = userResult.insertId // grab the id we used to make the user
        
        //specific info 
        if (user_type === 'student') {
            const { student_number, course_enrolled } = req.body 
            const [studentlogin] = await db.query('INSERT INTO students (user_id, email, first_name, middle_name, last_name, student_number, course_enrolled) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [userId, email, first_name, middle_name, last_name, student_number, course_enrolled])
            if (studentlogin?.affectedRows > 0) {
                res.status(201).json({ message: 'User created successfully!' })
            } else {
                console.error('Fucked up creating student profile for email: ', email, " ", studentlogin)
                res.status(400).json({ message: "i fucked up making the profile : P"})
            }
        } 

        if (user_type === 'company') {
            const {name, brn, industry, website, location, contact_no} = req.body
            const [companylogin] = await db.query('INSERT INTO companies (user_id, name, brn, industry, website, location, contact_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, name, brn, industry, website, location, contact_no])
            if (companylogin?.affectedRows > 0) {
                res.status(201).json({ message: 'User created successfully!' })
            } else {
                console.error('Fucked up creating company profile for email: ', email, " ", companylogin)
                res.status(400).json({ message: "i fucked up making the profile : P"})
            }
        }

        if (user_type === 'admin') {
            const {department, contact_no} = req.body
            const [adminlogin] = await db.query('INSERT INTO admins (user_id, first_name, middle_name, last_name, admin_position, department, contact_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, first_name, middle_name, last_name, admin_position, department, contact_no])
            if (adminlogin?.affectedRows > 0) {
                res.status(201).json({ message: 'User created successfully!' })
            } else {
                console.error('Fucked up creating admin profile for email: ', email, " ", adminlogin)
                res.status(400).json({ message: "i fucked up making the profile : P"})
            }
        }


    } catch (err) {
        console.error('Error during signup: ', err)
        res.status(500).json({ message: "Something screwed up internally while signing up."})
    }
})

//login stuff
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        console.log("someone's trying to log in with ", email, " ", password) //logging
        
        //if email exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        const user = rows[0]
        const match = await bcrypt.compare(password, user.password) //see if password matches
        
        //if it doesn't,
        if (!match) return res.status(401).json({ message: 'Incorrect email or password :/' })

        // but if it does,
        const payload = { id: user.id, email: user.email, user_type: user.user_type }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.json({ message: 'Login successful!', token, user: payload })
    } catch (err) {
        console.error('Error during login: ', err)
        res.status(500).json({ message: "Something screwed up internally while logging in."})
    }
})

// get profiles
router.get('/profile/:userId', verifyToken, async (req, res) => {
    try {
        const userId = Number(req.params.userId)
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' })

        const userType = req.user.user_type

        if (userType === 'student') {
            const [rows] = await db.query(
              `SELECT users.id AS id, users.email, users.user_type, students.first_name, students.middle_name, students.last_name, students.student_number, students.course_enrolled
               FROM users
               LEFT JOIN students ON users.id = students.user_id
               WHERE users.id = ?`,
              [userId]
            )
            if (!rows.length) return res.status(404).json({ message: 'User not found' })
            return res.json({ profile: rows[0] })
        }

        if (userType === 'company') {
            const [rows] = await db.query(
              `SELECT users.id AS id, users.email, users.user_type, companies.name, companies.brn, companies.industry, companies.website, companies.location, companies.contact_no
               FROM users
               LEFT JOIN companies ON users.id = companies.user_id
               WHERE users.id = ?`,
              [userId]
            )
            if (!rows.length) return res.status(404).json({ message: 'User not found' })
            return res.json({ profile: rows[0] })
        }

        // fallback for admin/other
        const [rows] = await db.query('SELECT id, email, user_type FROM users WHERE id = ?', [userId])
        if (!rows.length) return res.status(404).json({ message: 'User not found' })
        res.json({ profile: rows[0] })
    } catch (err) {
        console.error('Screwed up getting profile: ', err)
        res.status(500).json({ message: 'Server error' })
    }
})
router.get('/job-listings', async (req, res) => {
    try {
        const course = req.query.course //get course from query params
        const [rows] = await db.query('SELECT * FROM job_listings WHERE course = ?', [course])
        if (!rows.length) return res.status(404).json({ message: "No job listings found for the specified course." })
        res.json({ job_listings: rows })
    } catch (err) {
        console.error('Screwed up getting job postings: ', err)
        res.status(500).json({ message: "Something screwed up internally while getting job postings." })  
    }
})

router.post('/job-listings', verifyToken, requireRole('company', 'admin'), async (req, res) => {
    try {
        const { name, description, requirements, course, company } = req.body
        const [result] = await db.query('INSERT INTO job_listings (name, description, requirements, course, company) VALUES (?, ?, ?, ?, ?)', 
        [name, description, requirements, course, company])
        if (result?.affectedRows > 0) {
            res.status(201).json({ message: 'Job listing created successfully!' })
        } else {
            console.error('Fucked up creating job listing: ', result)
            res.status(400).json({ message: "i fucked up making the job listing : P"})
        }
    } catch (err) {
        console.error('Error during job listing creation: ', err)
        res.status(500).json({ message: "Something screwed up internally while creating job listing."})
    }
})

router.get('/job-listings/:id', async (req, res) => {
    try {
        const jobId = req.params.id
        const [rows] = await db.query('SELECT * FROM job_listings WHERE id = ?', [jobId])
        if (!rows.length) return res.status(404).json({ message: "Job posting not found." })
        res.json({ job_posting: rows[0] })
    } catch (err) {
        console.error('Screwed up getting job posting: ', err)
        res.status(500).json({ message: "Something screwed up internally while getting job posting." })
    }
})






module.exports = router