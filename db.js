const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String
});

const courseSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    imageUrl: {type: String, required: true},
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    courseId: { type: Schema.Types.ObjectId, ref: 'course', required: true }
});

const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}