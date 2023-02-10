const express = require("express");
const Course = require("../src/modules/course");
const router = express.Router();
const Faculty = require("../src/modules/faculty")
// const db = require('../src/db/conn');
// const Faculty1 = db.collection('Faculty');
router.get("/Test",async(req,res)=>{
    try{
      console.log(Faculty.findOne({email:"ankitmahto1989@gmail.com"}))
      console.log("hello")
    }
    catch(e)
    {
        console.log("hello")
    }
})
router.post("/login",async(req,res) => {
    
    try{
            console.log("Faculty");
            console.log(req.body);
            const userd= await Faculty.findOne({username:req.body.username});
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
router.post("/add",async(req,res) => 
{
    try{
    
        console.log(req.body)
                const userd= new Course({
                name: req.body.course_name,
                price: req.body.price,
                status:req.body.status,
                stream:req.body.stream,
                video:req.body.video,
                fac:req.body.id
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
          
    }
    catch(e){
        const msg = {"success":false}
        res.send(msg); 
    }
})
router.post("/users",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await Faculty.findOne({_id:req.body.id});
        // console.log(`Found username ${userd}`);
                    const username = userd.username;
                    const senddata = {"username":username};
                    // console.log(senddata);
                    res.send (senddata);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 router.post("/all",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await Course.find({fac:req.body.id});
                    console.log(userd)
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 router.post("/verified",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await Course.find({fac:req.body.id,status:"Verified"});
                    console.log(userd)
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
 router.post("/unverified",async(req,res) =>
 {
    // console.log(req.body);
    try{
        // console.log(req.body);
        const userd= await Course.find({fac:req.body.id,status:"unverified"});
                    console.log(userd)
                    res.send (userd);
        
       
}
catch(e){
    console.log('error');
    res.send('Error');
}
 })
module.exports = router;