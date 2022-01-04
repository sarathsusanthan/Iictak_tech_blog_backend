const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@sarathfiles.1yent.mongodb.net/TECHBLOG?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const ContactSchema=new Schema({
    name:String,
    email:String,
    message:String
});
var Contactdata=mongoose.model('contactdata',ContactSchema);
module.exports=Contactdata;