const express=require('express');
const port =process.env.PORT || 3211;
console.log("ok");
const app=express();
app.listen(port,()=>{console.log("server ready at"+port)});