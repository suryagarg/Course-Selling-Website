const { Router } = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db")
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../Middlewares/adminMiddleware");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

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

adminRouter.post("/course", adminMiddleware, async function(req, res){
    //Admin can post course
    const adminId = req.userId;

    const { title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware, async function(req, res){
    //Admin can make changes in course
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
    })
    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware ,async function(req, res){
    //Admin can preview all course
    const adminId = req.userId;
    const course = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        message: "Course Updated",
        course
    })
})

module.exports = {
    adminRouter: adminRouter
}