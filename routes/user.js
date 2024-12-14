// const express = require("express");
// const router = express.Router;    

const { Router } = require("express"); //other way of doing above
const { userModel, purchaseModel, courseModel } = require("../db")
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {courseRouter} = require("./course");
const userMidddleware = require("../Middlewares/userMiddleware");
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

userRouter.get("/purchasedCourse",userMidddleware, async function(req, res){
    //preview of Already Purchased Course
    const userId = req.userId;
    const purchasedCourse = await purchaseModel.find({
        userId,
    });
    let purchasedCourseId = [];
    
    for(let i=0; i<purchasedCourse.length; i++){
        purchasedCourseId.push(purchasedCourse[i].courseId)
    }
    const courseData = await courseModel.find({
        _id: { $in: purchasedCourseId }
    })

    res.json({
        purchasedCourse,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}