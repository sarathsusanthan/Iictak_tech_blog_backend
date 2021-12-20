const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Techblog',{useNewUrlParser:true, useUnifiedTopology:true});
const Schema = mongoose.Schema;
const catSchema=new Schema({
   category:String
});
var Category=mongoose.model('category',catSchema);
module.exports=Category;