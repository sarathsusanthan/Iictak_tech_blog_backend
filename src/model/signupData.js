const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Techblog',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const SignupSchema=new Schema({
    name:String,
    id:String,
    email:String,
    password:String
});
var Signupdata=mongoose.model('signupdata',SignupSchema);
module.exports=Signupdata;