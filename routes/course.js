// const express = require("express");
// const router = express.Router

const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function(req, res){
    //Router to buy course
})

courseRouter.get("/purchasedCourse", function(req, res){
    //preview of Already Purchased Course
})


courseRouter.get("/preview", function(req, res){
    //Preview the all course and decide to buy or not
})

module.exports = {
    courseRouter: courseRouter
}