const express=require('express');
const port =process.env.PORT || 3000;
const path = require('path');
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
const Userpostdata=require('./src/model/Userpostdata');
const Signupdata=require('./src/model/signupData');
const Category=require('./src/model/category');
const jwt=require('jsonwebtoken');
const Contactdata = require('./src/model/contactdata');
const app=express();
app.use(express.static('./dist/Frontend'))
app.use(cors());
app.use(bodyparser.json());
//verify admin
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

//verify trainer
  function trainerverifyToken(req, res, next) {
    
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'trainerKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
//verify user
function userverifyToken(req, res, next) {
    
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'userKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }


// signup handling

app.post('/api/signup',async (req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
       try{
           
           const user=req.body.user.email;
           
           const username= await Signupdata.findOne({email:user});
           
           if(username){
              return res.send({mesg:false})
           }else{
               const pwd=req.body.user.password;
               const paswd= await Signupdata.findOne({password:pwd});
               if(paswd){
                return res.send({mesg:false})
               }else{
                   var item={
                       name:req.body.user.name,
                       id:req.body.user.id,
                       email:req.body.user.email,
                       password:req.body.user.password
                   }
                   var sign= Signupdata(item);
                   sign.save();
                   return res.send({mesg:true})
               }
           }
           
       }catch(error){
        return res.send({mesg:false})
       }
   
   })
//login handling

app.post('/api/login',async (req,res)=>{
    user="admin";
    password="1234";
    try {
       
    let userData=req.body;
    
    const use=userData.uname;
    const pas=userData.password;
    if(userData.uname=="admin"&&userData.password=="1234"){
       
        let payload={subject:user+password}
        let token=jwt.sign(payload,'secretKey');
        
        return res.send({mesg:token,role:'admin'});
    }
    const username= await Signupdata.findOne({email:use});
    if(username.id=="user"){
        if(username.password==pas){
            let payload={subject:user+password}
            let usertoken=jwt.sign(payload,'userKey');
            let name=username.name;
            return res.send({mesg:usertoken,role:'user',nam:name});
            
        }
    }
    if(username.id=="trainer"){
        if(username.password==pas){
            let payload={subject:user+password}
            let usertoken=jwt.sign(payload,'trainerKey');
            let name=username.name;
            return res.send({mesg:usertoken,role:'trainer',nam:name});
        }
    }
    
    else{
       return res.send({mesg:"notfound"});
    }
    
}
catch(error){
    return res.send({mesg:"notfound"});
   }
})
//getting posts
app.get('/api/posts',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
  
    Postdata.find()
    .then((posts)=>{
        res.send(posts);
    })
})
//getting single post
app.get('/api/posts/:id',(req,res)=>{
    const id=req.params.id;
    
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    })
})
//adding new post
app.post('/api/newpost',verifyToken,(req,res)=>{
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={
        user:req.body.user,
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
    }
    
    var posts=new Postdata(post)
    posts.save()
    res.send();
})
//adding new post by trainer
app.post('/api/trainerpost',trainerverifyToken,(req,res)=>{
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={
        user:req.body.user,
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
    }
    
    var posts=new Postdata(post)
    posts.save()
    res.send();
})
//deleting post
app.delete('/api/delete/:id',(req,res)=>{
    id=req.params.id;
    Postdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})



// adding user posts to db
  app.post('/api/usernewpost',userverifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={
        user:req.body.user,
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
    }
    
    var posts=new Userpostdata(post)
    posts.save()
    res.send();
  })

//getting post for editing
app.get('/api/edit/:id',(req,res)=>{
    const id=req.params.id;
    
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    })
})
//updating posts
app.put('/api/updatepost',(req,res)=>{
    id=req.body._id;
    Postdata.findByIdAndUpdate({_id:id},{$set:{
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
    }},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})


// getting user posts for approval

app.get('/api/userposts',function(req,res){
    
    Userpostdata.find()
                .then(function(posts){
                    res.send(posts);})
                });

//adding new category

app.post('/api/categoty',verifyToken,async (req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
       try{
           
           const newcat=req.body.category;
           
           const category= await Category.findOne({category:newcat});
           
           if(category){
              return res.send({mesg:false})
           }else{

            var cat={
                category:req.body.category
                
            }
            
            var cats=new Category(cat)
            cats.save()
            return res.send({mesg:true});    
           }
           
       }catch(error){
        return res.send({mesg:false});
       }
   
    
})
//deleting category
app.delete('/api/deletecat/:id',verifyToken,(req,res)=>{
    id=req.params.id;
    Category.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})
//getting category

app.get('/api/cat',(req,res)=>{
    Category.find()
    .then((cats)=>{
        res.send(cats);
    })
})

   




app.delete('/api/deleteUserPost/:id',(req,res)=>{
    id=req.params.id;
    Userpostdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})


//deleting post
app.delete('/api/delete/:id',(req,res)=>{
    id=req.params.id;
    Postdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})

 
//contactus

app.post('/api/contactus',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
      
          
               
                   var user={
                       name:req.body.name,
                     
                       email:req.body.email,
                       message:req.body.message
                   }
                   var mesg= new Contactdata(user);
                   mesg.save();
                   res.send({mesg:true});
               });
  app.get('/*',function(req,res){
      res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
  })                    

app.listen(port,()=>{console.log("server ready at"+port)});