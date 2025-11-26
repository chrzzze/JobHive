const express = require('express')
const cors = require("cors")
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

router.get('/courses', async (req, res) => {
    try {
        console.log('Fetching courses from database')
        const [courses] = await db.query('SELECT * FROM courses')
        res.json({ courses })
    } catch (err) {
        console.error('Screwed up grabbing courses: ', err)
        res.status(500).json({ message: 'Server error fetching courses : (' })
    }
})