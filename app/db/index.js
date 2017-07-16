 const config = require ('../config');

 const mongoose =  require ('mongoose').connect('mongodb://localhost/chatCAT');


 mongoose.connection.on('error', (error)=>{
     console.log('mongo eroor',  error);
 })

 const chatUser=  new mongoose.Schema({
     profileId:String,
     fullName:String,
     profilePic:String
 })
 let userModel = mongoose.model('chatUser', chatUser)
 module.exports ={
     mongoose,
     userModel
 }