import { Router, json } from 'express'
import cors from "cors"
const router = Router()
router.use(json())
router.use(cors())

const db = require("mysql2").createPool({ //connect to xamppp 
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}).promise()

router.post('/applications', async (req, res) => {
    try {
        const { student_number, job_listing_id, application_date} = req.body
        console.log('Creating job application: ', student_number, job_listing_id, application_date)
} catch (err) {
        console.error('Screwed up creating job application: ', err)
        res.status(500).json({ message: 'Server error creating job application : (' })
    }
})

router.get('/applications', async (req, res) => {
try {
    console.log('Fetching job applications from database')
    const [applications] = await db.query('SELECT * FROM job_applications')
    res.json({ applications })
} catch (error) {
    console.error('Screwed up grabbing job applications: ', err)
    res.status(500).json({ message: 'Server error fetching job applications : (' })3
}
})