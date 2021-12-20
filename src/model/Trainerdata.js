const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Techblog',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const TrainerSchema=new Schema({
    title:String,
    author:String,
    post:String,
    category:String,
    image:String
});
var Trainerdata=mongoose.model('trainerdata',TrainerSchema);
module.exports=Trainerdata;