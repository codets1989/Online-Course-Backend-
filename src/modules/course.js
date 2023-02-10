const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
        name:String,
        faculty:String,
        stream:String,
        price:String,
        status:String,
        fac:String,
        video:Array,
   
}

)
const Course = new mongoose.model("Course",CourseSchema);
module.exports = Course;
