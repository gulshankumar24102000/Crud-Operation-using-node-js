const express=require('express');
const cors=require("cors")
const app=express();
const mongoose=require('mongoose');
const User=require('./models/developer')
var bodyParser=require('body-parser')
var jsonParser=bodyParser.json();

mongoose.connect('mongodb+srv://amir:LYr9VxASrTet6Se5@cluster0.gtlyzib.mongodb.net/job-post?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
);
app.use(cors());
app.get('/jobpost',function(req,res){
   User.find().then((data)=>{
res.status(200).json(data)
   })
})
app.post('/jobpost',jsonParser,function(req,res){
    const data=new User({
        _id:new mongoose.Types.ObjectId(),
        jobtitle:req.body.jobtitle,
        experience:req.body.experience,
        durationto:req.body.durationto,
        exp:req.body.exp,
        durationuntil:req.body.durationuntil,
        salary:req.body.salary,
        location:req.body.location

    })
   data.save().then((result)=>{
res.status(201).json(result)
   })
   .catch(()=>
    console.warn(error)
   )
})
app.delete('/jobpost/:id',function(req,res){
    User.deleteOne({_id:req.params.id}).then((result)=>{
res.status(200).json(result)
    }).catch((err)=>{
console.warn(err);
    })
})

app.put('/jobpost/:id',jsonParser,function(req,res){
    User.updateOne({_id:req.params.id},
        {$set:{
            jobtitle:req.body.jobtitle,
            experience:req.body.experience,
            durationto:req.body.durationto,
            exp:req.body.exp,
            durationuntil:req.body.durationuntil,
            salary:req.body.salary,
            location:req.body.location

        }}
        ).then((result)=>{
            res.status(202).json(result)
        }).catch((err)=>{
            console.warn(err);
                })
})

app.get("/search/:name",function(req,res){
    var regex=new RegExp(req.params.name,'i');
    User.find({name:regex}).then((result)=>{
res.status(200).json(result)
    })
})
app.listen(6000)