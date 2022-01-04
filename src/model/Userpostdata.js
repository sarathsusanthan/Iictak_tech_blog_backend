const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@sarathfiles.1yent.mongodb.net/TECHBLOG?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const UserpostSchema=new Schema({
    user:String,
    title:String,
    author:String,
    post:String,
    category:String,
    image:String,
    likes:Number,
    dislikes:Number
});
var Userpostdata=mongoose.model('userpostdata',UserpostSchema);
module.exports=Userpostdata;