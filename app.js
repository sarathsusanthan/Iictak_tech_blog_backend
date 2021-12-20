const express=require('express');
const port =process.env.PORT || 3000;
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
const Userpostdata=require('./src/model/Userpostdata');
const Signupdata=require('./src/model/signupData');
const Category=require('./src/model/category');
const jwt=require('jsonwebtoken');
const app=express();
app.use(cors());
app.use(bodyparser.json());

// signup handling

app.post('/signup',async (req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
       try{
           
           const user=req.body.user.email;
           
           const username= await Signupdata.findOne({email:user});
           
           if(username){
               res.send({mesg:false})
           }else{
               const pwd=req.body.user.password;
               const paswd= await Signupdata.findOne({password:pwd});
               if(paswd){
                   res.send({mesg:false})
               }else{
                   var item={
                       name:req.body.user.name,
                       id:req.body.user.id,
                       email:req.body.user.email,
                       password:req.body.user.password
                   }
                   var sign= Signupdata(item);
                   sign.save();
                   res.send({mesg:true})
               }
           }
           
       }catch(error){
           res.send({mesg:false})
       }
   
   })
//login handling

app.post('/login',async (req,res)=>{
    user="admin";
    password="1234";
    try {
       
    let userData=req.body;
    
    const use=userData.uname;
    const pas=userData.password;
    if(userData.uname=="admin"&&userData.password=="1234"){
       
        let payload={subject:user+password}
        let token=jwt.sign(payload,'secretKey');
        
        res.send({mesg:token,role:'admin'});
    }
    const username= await Signupdata.findOne({email:use});
    if(username.id=="user"){
        if(username.password==pas){
            let payload={subject:user+password}
            let usertoken=jwt.sign(payload,'userKey');
            
            res.send({mesg:usertoken,role:'user'});
            // res.send({mesg:"user"});
        }
    }
    if(username.id=="trainer"){
        if(username.password==pas){
            let payload={subject:user+password}
            let usertoken=jwt.sign(payload,'trainerKey');
            res.send({mesg:usertoken,role:'trainer'});
        }
    }
    
    else{
        res.send({mesg:"notfound"});
    }
    
}
catch(error){
    res.send({mesg:"notfound"});
   }
})
//getting posts
app.get('/posts',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
  
    Postdata.find()
    .then((posts)=>{
        res.send(posts);
    })
})
//getting single post
app.get('/posts/:id',(req,res)=>{
    const id=req.params.id;
    
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    })
})
//adding new post
app.post('/newpost',(req,res)=>{
    
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
app.delete('/delete/:id',(req,res)=>{
    id=req.params.id;
    Postdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})


//  Start of multer section
const multer = require("multer");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null,  `files-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
  });

  app.post('/usernewpost',(req,res)=>{

//getting post for editing
app.get('/edit/:id',(req,res)=>{
    const id=req.params.id;
    
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    })
})
//updating posts
app.put('/updatepost',(req,res)=>{
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
<<<<<<< HEAD
=======
// trainer

app.post('/trainerpost',(req,res)=>{

    
    res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={

        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
    }
    
    var posts=new Userpostdata(post)

    var posts=new Trainerdata(post)
    posts.save()
    res.send();
})
>>>>>>> b992c1f0a92664b61ad1b36b9edb8a5f7103e1ee

app.get('/userposts',function(req,res){
    
    Userpostdata.find()
                .then(function(posts){
                    res.send(posts);
                });

//adding new category
app.post('/categoty',(req,res)=>{
    var cat={
        category:req.body.category
        
    }
    
    var cats=new Category(cat)
    cats.save()
    res.send();
    
})
//deleting category
app.delete('/deletecat/:id',(req,res)=>{
    id=req.params.id;
    Category.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})
//getting category

app.get('/cat',(req,res)=>{
    Category.find()
    .then((cats)=>{
        res.send(cats);
    })
})

   

<<<<<<< HEAD

=======
app.get('/trainerposts',function(req,res){
    Trainerdata.find()
    .then(function(posts){
        res.send(posts);
    });


});
app.get('/userpost/:id',  (req, res) => {
  
    const id = req.params.id;
      Userpostdata.findOne({"_id":id})
      .then((post)=>{
          res.send(post);
      });
  })

app.delete('/deleteUserPost/:id',(req,res)=>{
    id=req.params.id;
    Userpostdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})

app.put('/userupdatepost',(req,res)=>{
    console.log(req.body)
     id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    post = req.body.post,
    category = req.body.category,
    image = req.body.image
    Userpostdata.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "post":post,
                                "category":category,
                                "image":image}})
   .then(function(){
       res.send();
   })
 })



app.delete('/trainerdelete/:id',(req,res)=>{
    id=req.params.id;
    Trainerdata.findByIdAndDelete({_id:id},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})
>>>>>>> b992c1f0a92664b61ad1b36b9edb8a5f7103e1ee

app.listen(port,()=>{console.log("server ready at"+port)});