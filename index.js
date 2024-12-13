require('dotenv').config();
console.log(process.env.MONGO_DB_URL)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_DB_URL)
    app.listen(3000);
    console.log("Connected")
}

main();