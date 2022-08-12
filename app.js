const express = require("express");
const bodyparser = require("body-parser");
const jwt = require('jsonwebtoken');
const path =require("path");
const app= express();
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;
const verify = require("./src/modules/verifyToken");
 require('./src/db/conn');
const User = require("./src/modules/registers");
const Course = require("./src/modules/course");
const { ok } = require("assert");
 app.use(express.static("D:/Software_project/Frontend/Html"));
 app.use(express.static("D:/Software_project/Frontend/Css"));
 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname + '/src' , "views"));
 app.use(cors());
 app.options('*', cors()); 
 app.use(bodyparser.json());
 
 
 app.use(bodyparser.urlencoded({ extended: false }));
console.log(__dirname);


app.get("/Register" ,async(req,res) =>
{
    res.render('register'); 
    const coursed = await Course.find();
    console.log(coursed);
   
});
app.get("/Login" ,async(req,res) =>
{
    res.render('Login');
 });


app.post("/Register",async(req,res) => {
    try{
    
      console.log(req.body)
            const userd= new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                interests: req.body.interests,
            })
            const registered = await userd.save();
            if(registered===undefined)
            {
                const msg = {"success":false}
                res.send(msg);  
            }
            else
            {
            const msg = {"success":true}
             res.send(msg);
            }
            // console.log(registered);
    }
    catch(e){
        const msg = {"success":false}
        res.send(msg); 
    }
}
)
app.post("/Login",async(req,res) => {
    
    try{
            console.log(req.body);
            const userd= await User.findOne({username:req.body.username});
            console.log(`Found username ${userd}`);

            if (req.body.password=== userd.password)
            {
                        console.log("Sucessful login");
                        const username = req.body.username;
                        console.log(username);
                        // const token =jwt.sign({username},process.env.TOKEN_SECRET);
                        // res.status(200).send({ auth: true, token: token });
                        console.log(userd.password);
                        const senddata = {"id":userd._id,"success":true};
                        console.log(senddata);
                        res.send (senddata);
                        
            }
            else 
            {
                const msg = {"success":false}
                res.send(msg); 
            }
            
           
    }
    catch(e){
        const msg = {"success":false}
        res.send(msg); 
    }
}
)

 app.post("/users",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await User.findOne({_id:req.body.id});
        // console.log(`Found username ${userd}`);
                    const username = userd.username;
                    const course = userd.courses;
                    const interests = userd.interests;
                    const senddata = {"username":username,"courses":course,"interests":interests};
                    // console.log(senddata);
                    res.send (senddata);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 app.post("/courses",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await Course.find({stream:req.body.id});
        // console.log(`Found course ${userd}`);
        // const coursed = JSON.stringify(userd);
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 app.put("/addcourses",async(req,res) =>
 {
    // console.log(req.body);
    try{
       // console.log(req.body);
      
         const coursed = await User.updateOne({"_id":req.body.student},{$addToSet:{"courses":req.body.course}},function(error,lol)
        { if(error){
             const tot = {"status": "ok"}
             res.send(tot);
        }
         });
          const registered = await coursed.save(function(err , upob)
          {
              if (err)
              {
                res.status(200);
              }
          }
          );
         
                    res.status(200);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 app.post("/checkcourses",async(req,res) =>
 {
    //  console.log(req.body.id.course);
    try{
        // console.log(req.body);
        const userd= await Course.find({_id:req.body.id.course});
        // console.log(`Found course ${userd}`);
        // const coursed = JSON.stringify(userd);
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 app.put("/dropcourses",async(req,res) =>
 {
    //  console.log(req.body.id.course);
    try{
        // console.log(req.body);
        const coursed = await User.updateOne({"_id":req.body.student},{$pull:{"courses":req.body.course}})
        // console.log(`Found course ${userd}`);
        // const coursed = JSON.stringify(userd);
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })

 
 app.post("/Search",async(req,res)=>
 { 

     try {
        console.log(req.body);
        
    const coursed= await Course.find({course_name: new RegExp( req.body.course ,'i')})
    // {post_text:{$regex:"tutorialspoint",$options:"$i"}
    console.log(`Found course ${coursed}`);
    console.log(coursed)
    res.send(coursed);
     }
     catch(e)
     {
        //  res.redirect('/Login');
     }
 }
 )
 app.post("/notifications",async(req,res) =>
 {
    console.log(req.body);
    try{
        console.log(req.body);
        const userd= await Course.aggregate([{$sample: {size: 1}}]);
        // ([
        //     { $match: { a: 10 } },
        //     { $sample: { size: 1 } }
        // ])
        // const coursed = JSON.stringify(userd);
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
//  app.post("/inscour",async(req,res) => {
//     try{
    
//         console.log(req.body);
//             const crrd= new Course({
//                 course_id: req.body.course_id,
//                 course_name: req.body.course_name,
//                 faculty: req.body.faculty,
//                 stream: req.body.stream,
//                 price: req.body.price,
               
//             })
         
//             const registered = await crrd.save();
//             if(registered===undefined)
//             {
//                 const msg = {"success":false}
//                 res.send(msg);  
//             }
//             else
//             {
//             const msg = {"success":true}
//              res.send(msg);
//             }
//             // console.log(registered);
//     }
//     catch(e){
//         const msg = {"success":false}
//         res.send(msg); 
//     }
// }
// )
// app.put("/upcour",async(req,res) =>
//  {
//    console.log(req.body);
//     try{
  
//         const oldvalue = await Course.find({"course_id":req.body.course_id})
//         const coursed = await Course.updateOne({"course_id":req.body.course_id},{$set:{"course_name":req.body.course_name,"faculty":req.body.faculty,"price":req.body.price}})
//         const newvalue = await Course.find({"course_id":req.body.course_id})
//         // const coursed = JSON.stringify(userd);
//                     res.send ({"old":oldvalue,"new":newvalue});
        
       
// }
// catch(e){
//     console.log('error');
//     res.send('Error');
// }
//  })
//  app.put("/delcour",async(req,res) =>
//  {
//    console.log(req.body);
//     try{
  
//         const deletedvalue = await Course.find({"course_id":req.body.course_id})
//         const value = await Course.deleteOne({"course_id":req.body.course_id})
//                     res.send (deletedvalue)
        
       
// }
// catch(e){
//     console.log('error');
//     res.send('Error');
// }
//  })
//  app.put("/dropuser",async(req,res) =>
//  {
   
//     try{
  
//      const delet=await User.drop({"username":req.body.username});
        
        
       
// }
// catch(e){
//     console.log('error');
//     res.send(e);
// }
//  })
app.listen(port , () => {
   console.log(`server is running at port no ${port}` );
});
