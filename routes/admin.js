const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db")
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "LllkhkllimkKDk234243@"

adminRouter.post("/signup", async function(req, res){
    const {email, password, firstName, lastName} = req.body;

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "Signup Succeed"
    })
})

adminRouter.post("/login", async function(req, res){
    const {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    })
    if(admin){
        const token = jwt.sign({
            _id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            message: token
        })
    }else{
        res.json({
            message: "Invalid Credential"
        })
    }
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