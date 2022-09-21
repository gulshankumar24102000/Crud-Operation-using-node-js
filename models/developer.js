const mongoose=require('mongoose')
let userSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
jobtitle:String,
experience:Number,
durationto:String,
exp:Number,
durationuntil:String,
salary:Number,
location:String,
})
module.exports=mongoose.model('developer',userSchema)