// const express = require("express");
// const router = express.Router;    

const { Router } = require("express"); //other way of doing above
const { userModel } = require("../db")
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
userRouter.post("/signup", async function(req, res){
    const {email, password, firstName, lastName} = req.body;

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "Signup Succeed"
    })
})

userRouter.post("/login", async function(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })
    if(user){
        const token = jwt.sign({
            _id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            message: token
        })
    }else{
        res.json({
            message: "Invalid Credential"
        })
    }
})

userRouter.get("/purchasedCourse", function(req, res){
    //preview of Already Purchased Course
})

module.exports = {
    userRouter: userRouter
}