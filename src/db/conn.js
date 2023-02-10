const mongoose = require("mongoose");
const dbs = mongoose.connect("mongodb://localhost:27017/userdetails", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{ 

    console.log("connection successful");
}
).catch((e)=>
{
  console.log("no connection");
}
)
