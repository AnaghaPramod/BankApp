//server - mongodb Integration


//1.import mongoose
const mongoose = require('mongoose')

//2.state connection string via mongodb
mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true  //avoid unwanted warnings
})

//3.define bank model 
const User=mongoose.model('User',{//mode creation user
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}