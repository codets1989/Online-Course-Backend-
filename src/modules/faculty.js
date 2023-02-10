const mongoose = require("mongoose");
var i =0;

const FacultySchema = new mongoose.Schema({
  email:String,
  password:String,
  username:String,
  gender:String,
  fullname:String,

}

)
const Faculty = new mongoose.model("Faculty",FacultySchema );
module.exports = Faculty;
