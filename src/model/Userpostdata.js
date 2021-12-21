const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Techblog',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const UserpostSchema=new Schema({
    user:String,
    title:String,
    author:String,
    post:String,
    category:String,
    image:String
});
var Userpostdata=mongoose.model('userpostdata',UserpostSchema);
module.exports=Userpostdata;