const express=require('express');

const port =process.env.PORT || 3000;
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
const Trainerdata=require('./src/model/Trainerdata')
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
    
    var posts=new Trainerdata(post)
    posts.save()
    res.send();
})

app.get('/trainerposts',function(req,res){
    Trainerdata.find()
    .then(function(posts){
        res.send(posts);
    });

});

app.get('/trainerpost/:id',  (req, res) => {
  
    const id = req.params.id;
      Trainerdata.findOne({"_id":id})
      .then((post)=>{
          res.send(post);
      });
  })

app.put('/edittrainerpost',(req,res)=>{
    console.log(req.body)
     id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    post = req.body.post,
    category = req.body.category,
    image = req.body.image
    
   Trainerdata.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "title":title,
                                "author":author,
                                "category":category,
                                "post":req.body.post,
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





app.listen(port,()=>{console.log("server ready at"+port)});