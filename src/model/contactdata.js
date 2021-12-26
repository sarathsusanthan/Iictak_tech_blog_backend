const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Techblog',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const ContactSchema=new Schema({
    name:String,
    email:String,
    message:String
});
var Contactdata=mongoose.model('contactdata',ContactSchema);
module.exports=Contactdata;