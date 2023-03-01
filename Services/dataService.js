//import jsonwebtoken

const jwt = require('jsonwebtoken');

//import db.js
const db=require('./db')




  const register=(acno,username,password)=>{
    return db.User.findOne({acno}).then( //asynchronous call(27017 & 3000)
      user=>{
        if(user){
          return{
            status:false,
            statusCode:401,
            message:"User already registered"
          }
        }else{
          const newUser=new db.User({
            acno:acno,
            username:username,
            password:password,
            balance:0,
            transaction:[]
          })
          newUser.save()//to save new data to mongodb
          return{
            status:true,
            statusCode:200,
            message:"Register successful"
          }
        }
      }
    )
    if(acno in userDetails){
      return {
        status:false,
        statusCode:401,
        message:"User already exists"
      }
    }else{
      userDetails[acno]={
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      }
      return {
        status:true,
        statusCode:200,
        message:"Register successful"
      }
    }
  }

  const login=(acno,password)=>{
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          currentUser=user.username;
          currentAcno=acno
        //token generation
        const token = jwt.sign({currentAcno:acno},'superkey2023')
        //superkey 2023 wil generate a number eg jznv987e7cvghbn8
        return {
          status:true,
        statusCode:200,
          message:"Login successful",
          token:token
        }
        }else{
          return {
            status:false,
            statusCode:401,
            message:"Invalid details"
          }
        }
      }
    )



    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        currentUser=userDetails[acno]['username'];
        currentAcno=acno;
        //token generation
        const token = jwt.sign({currentAcno:acno},'superkey2023')
        //superkey 2023 wil generate a number eg jznv987e7cvghbn8
        return {
          status:true,
        statusCode:200,
          message:"Login successful",
          token:token
        }
      }else{
        return {
          status:false,
        statusCode:401,
        message:"Invalid password"
        }
      }
    }else{
      return {
        status:false,
        statusCode:401,
        message:"Invalid details"
      }
    }
  }


  const deposit=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,pswd}).then(
      user=>{
        if(user){
          if(pswd==user.password){
            user.balance += amount;
            user.transaction.push({
              type:'Credit',
              amount
            })
            user.save(); //save to mongodb
            return {
              status: true,
            statusCode:200,
              message:`${amount} is credited and balance is ${user.balance}`
            }
          }else{
            return {
              status: false,
            statusCode:401,
              message:"Invalid password"
            }
          }
        }else{
          return {
            status: false,
            statusCode:401,
              message:"invalid user details"
          }
        }
      }
    )
    var amount=parseInt(amt)
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        userDetails[acno]['balance'] += amount;
        userDetails[acno]['transaction'].push({
          type:'Credit',
          amount
        })
        return {
          status: true,
        statusCode:200,
          message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
        }
      }else{
        return {
          status: false,
        statusCode:401,
          message:"Invalid password"
        }
      }
    }else{
      return {
        status: false,
        statusCode:401,
          message:"invalid user details"
      }
    }
  }

  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,pswd}).then(
      user=>{if(user){
        if(pswd==user.password){
          user.balance -= amount;
          user.transaction.push({
            type:'Debit',
            amount
          })
          user.save(); //save to mongodb
          return {
            status: true,
          statusCode:200,
            message:`${amount} is debited and balance is ${user.balance}`
          }
        }else{
          return {
            status: false,
          statusCode:401,
            message:"Invalid password"
          }
        }
      }else{
        return {
          status: false,
          statusCode:401,
            message:"invalid user details"
        }
      }
    }
    )
    if(acno in userDetails){
      if(pswd=userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
          userDetails[acno]['balance'] -= amount;
          userDetails[acno]['transaction'].push({
            type:'Debit',
            amount
          })
          return {
            status: true,
        statusCode:200,
          message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
          }
        
        }
        
      }else{
        return {
          status: false,
        statusCode:401,
          message:"Invalid password"
        }
      }
    }else{
      return {
        status: false,
        statusCode:401,
          message:"invalid user details"
      }
    }
  }


  const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return{
            status:true,
            statusCode:200,
            transaction:user.transaction
          } 
        }else{
          return{
            status:false,
            statusCode:401,
            message:"User not found"
          }
        }
      }
    )
    return{
      status:true,
      statusCode:200,
      transaction:userDetails[acno]['transaction']
    } 
  }

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }



