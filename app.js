const express=require('express');
<<<<<<< HEAD
const port =process.env.PORT || 3000;
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
=======
const port =process.env.PORT || 3211;
console.log("ok");
>>>>>>> f3c8132e86e33cba8b9dff502f1fa0defac5ebd9
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
app.listen(port,()=>{console.log("server ready at"+port)});