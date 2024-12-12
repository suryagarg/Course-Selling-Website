// const express = require("express");
// const router = express.Router;    

const { Router } = require("express"); //other way of doing above
const { userModel } = require("../db")
const userRouter = Router();

userRouter.post("/signup", function(req, res){

})

userRouter.post("/login", function(req, res){
    
})

module.exports = {
    userRouter: userRouter
}