// const express = require("express");
// const router = express.Router

const {Router} = require("express");
const { courseModel, purchaseModel } = require("../db")
const userMidddleware = require("../Middlewares/userMiddleware")

const courseRouter = Router();

courseRouter.post("/purchase", userMidddleware, async function(req, res){
    //Router to buy course
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have succesfully buy your course"
    })
})
courseRouter.get("/preview", async function(req, res){
    //Preview the all course and decide to buy or not
    const courses = await courseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}