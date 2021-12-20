const express=require('express');
<<<<<<< HEAD
=======

>>>>>>> 6b2389c8230b1544176cbaca036e15892893662c
const port =process.env.PORT || 3000;
const cors =require('cors');
const bodyparser=require('body-parser');
const Postdata=require('./src/model/PostData');
<<<<<<< HEAD
const Signupdata=require('./src/model/signupData');
const Category=require('./src/model/category');
const jwt=require('jsonwebtoken');
=======
const Trainerdata=require('./src/model/Trainerdata')
console.log("ok");
>>>>>>> 6b2389c8230b1544176cbaca036e15892893662c
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
        
        res.send({mesg:token});
    }
    const username= await Signupdata.findOne({email:use});
    if(username.id=="user"){
        if(username.password==pas){
       
            res.send({mesg:"user"});
        }
    }
    if(username.id=="trainer"){
        if(username.password==pas){
       
            res.send({mesg:"trainer"});
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
<<<<<<< HEAD
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
=======

// trainer

app.post('/trainerpost',(req,res)=>{
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PUT,DELETE");
 
 
    var post={
>>>>>>> 6b2389c8230b1544176cbaca036e15892893662c
        title:req.body.title,
        author:req.body.author,
        category:req.body.category,
        post:req.body.post,
        image:req.body.image
<<<<<<< HEAD
    }},{new:true, useFindAndModify:false})
    .then(()=>{
        res.send();
    })
})
//adding new category
app.post('/categoty',(req,res)=>{
    var cat={
        category:req.body.category
        
    }
    
    var cats=new Category(cat)
    cats.save()
    res.send();
    
})

//getting category

app.get('/cat',(req,res)=>{
    Category.find()
    .then((cats)=>{
        res.send(cats);
    })
})
=======
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





>>>>>>> 6b2389c8230b1544176cbaca036e15892893662c
app.listen(port,()=>{console.log("server ready at"+port)});