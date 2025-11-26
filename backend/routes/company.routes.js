const express = require('express')
const cors = require("cors")
const router = express.Router()
router.use(cors())
router.use(express.json())

const { verifyToken, requireRole} = require('../middleware/auth.service.js') // yung mga service natin

const db = require('mysql2').createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}).promise()

router.post('/job-listings', verifyToken, requireRole('company'), async (req, res) => {
    try {
        const { name, company, course, requirements, description } = req.body
        console.log('Creating job listing: ', name, company, course, requirements, description)

        const [result] = await db.query(
            'INSERT INTO job_listings (name, company, course, requirements, description) VALUES (?, ?, ?, ?, ?)',
            [name, company, course, requirements, description]
        )   
        if (result.affectedRows === 0) {
            console.error('Fucked up creating job listing for company: ', company)
            return res.status(400).json({ message: "i fucked up making the job listing ^^;"})
        }
        res.status(201).json({ message: 'Job listing created successfully!' })
    } catch (err) {
        console.error('Screwed up creating job listing: ', err)
        res.status(500).json({ message: 'Server error creating job listing : (' })
    }
})

module.exports = router