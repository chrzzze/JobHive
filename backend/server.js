const express = require("express") //for handling html requests and promises whatever
const cors = require("cors") //allow cross origins stuff
const mysql = require("mysql2") //for sql
const app = express() 
const bcrypt = require("bcrypt") //hashing the passwords

app.use(express.json()) 
app.use(cors())

const db = mysql.createPool({ //connect to xamppp 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jobhive',
    port: 3306,

})

db.getConnection((err, connection) => { //test pool's working
    if (err) {
        console.error('screwed up connecting to the database: ', err)
        return
    }
    console.log('Databse connected successfully')
    connection.release()
})



app.post('/login', (req, res) => { //login function

    const { email, password } = req.body
    
    console.log("someone's trying to login with ", email, " ", password) //merely for logging purposes

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?'
    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.error('DB query error: ', err)
            res.status(500).json({message: 'An error occured while processing your request. Sorry : ('})

        } else {

            if (result.length > 0) {
                res.status(200).json({ message: 'Login successful!'})
            } else {
                res.status(401).json({message: 'Login failed. Invalid email or password.'})
            }

        } 
    })
})

const PORT = 3001

app.listen(PORT, () => {

    console.log(`listening successfully on ${PORT}!!`)
})