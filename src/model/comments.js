const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@sarathfiles.1yent.mongodb.net/TECHBLOG?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const commentSchema=new Schema({
    user:String,
    title:String,
    message:String
});
var Comment=mongoose.model('comment',commentSchema);
module.exports=Comment;