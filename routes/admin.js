const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db")

adminRouter.post("/signup", function(req, res){

})

adminRouter.post("/login", function(req, res){
    
})

adminRouter.post("/course", function(req, res){
    //Admin can post course
})

adminRouter.put("/course", function(req, res){
    //Admin can make changes in course
})

adminRouter.get("/course/bulk", function(req, res){
    //Admin can preview all course
})

module.exports = {
    adminRouter: adminRouter
}