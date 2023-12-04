const express = require('express')
const connection =  require('../connection')
const router = express.Router()
require('dotenv').config()
const nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post('/signup', (req, res)=>{
    let user = req.body
    query = "select email from user where email =?"
    connection.query(query, [user.email], (err, results)=>{
        if(!err){
            if(results.length <= 0){
               query = "insert into user (name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')"
               connection.query(query,[user.username, user.cnumber,user.email, user.password], (err, results) => {
                if(!err){
                    return res.status(200).json({message: 'Registered Successfully, Wait for Admin Approval.'})
                }
                else{
                    return res.status(500).json(err)
                }
               }) 
            }
            else{
                return res.status(400).json({message: 'Email is Already Exist'})
            }
        }
        else{
          return res.status(500).json(err)  
        }
    })
})


router.post('/forgotPassword', (req, res) => {
    const user = req.body
    query = "select email, password from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                return res.status(200).json({message: 'Password sent.'})
            }
            else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password sent by RSKMart',
                    html: '<p><b>Password:</b> <h1>'+results[0].password+'</h1></p>'
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Email sent")
                        return res.status(200).json({message: 'Password Sent to your gmail.'})
                    }
                })
            }

        }
        else{
            return res.status(500).json(err)
        }
    })
})



module.exports = router