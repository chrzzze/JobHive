const express = require('express')
const cors = require("cors") //allow cross origins stuff
const bcrypt = require("bcrypt") //hashing the passwords
const jwt = require("jsonwebtoken") //for token generation
require("dotenv").config() //for using env variables
const router = express.Router()
router.use(express.json())
router.use(cors())

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
        const { email, password, user_type } = req.body
        console.log("someone's trying to sign up with ", email, " ", password) //merely for logging purposes

        //if user exists
        const[exists] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (exists.length) return res.status(400).json({ message: 'Email already in use :/' })

        //else
        const hash = await bcrypt.hash(password, 10)
        await db.query('INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)', [email, hash, user_type])
        res.status(201).json({ message: 'User created successfully!' })
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

module.exports = router