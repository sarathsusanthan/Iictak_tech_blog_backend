const express=require('express');

const port =process.env.PORT || 3000;
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
const Userpostdata=require('./src/model/Userpostdata');

console.log("ok");
const app=express();
app.use(cors());
app.use(bodyparser.json());
app.get('/posts',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
  
    Postdata.find()
    .then((posts)=>{
        res.send(posts);
    })
})
app.get('/posts/:id',(req,res)=>{
    const id=req.params.id;
    
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    })
})

app.post('/newpost',(req,res)=>{
    
    res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={
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
    posts.save()
    res.send();
})

app.get('/userposts',function(req,res){
    
    Userpostdata.find()
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



app.listen(port,()=>{console.log("server ready at"+port)});