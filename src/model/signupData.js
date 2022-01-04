const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@sarathfiles.1yent.mongodb.net/TECHBLOG?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const SignupSchema=new Schema({
    name:String,
    id:String,
    email:String,
    password:String
});
var Signupdata=mongoose.model('signupdata',SignupSchema);
module.exports=Signupdata;