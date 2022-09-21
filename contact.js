const express=require('express');
const cors=require("cors")
const app=express();
const mongoose=require('mongoose');
const User=require('./models/job')
var bodyParser=require('body-parser')
var jsonParser=bodyParser.json();

mongoose.connect('mongodb+srv://amir:LYr9VxASrTet6Se5@cluster0.gtlyzib.mongodb.net/contact?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
);
app.use(cors());
app.get('/users',function(req,res){
   User.find().then((data)=>{
res.status(200).json(data)
   })
})
app.post('/users',jsonParser,function(req,res){
    const data=new User({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        message:req.body.message

    })
   data.save().then((result)=>{
res.status(201).json(result)
   })
   .catch(()=>
    console.warn(error)
   )
})
app.delete('/users/:id',function(req,res){
    User.deleteOne({_id:req.params.id}).then((result)=>{
res.status(200).json(result)
    }).catch((err)=>{
console.warn(err);
    })
})

app.put('/users/:id',jsonParser,function(req,res){
    User.updateOne({_id:req.params.id},
        {$set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            subject:req.body.subject,
        message:req.body.message

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
app.listen(4500)