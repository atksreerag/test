let Promise=require('promise')
const bcrypt =require('bcrypt')
var db=require('../config/connection')
var collection=require('../config/collection')
let ObjectId=require('mongodb').ObjectId
var saltRounds = 10;
var data=""
const jwt = require('jsonwebtoken')
module.exports={

    doReg:(userData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.REST_COLLECTION).insertOne(userData).then((response)=>{
                resolve(userData)

            })
            //callback(userData)
               // console.log(res);
                
               
            })
        },
        viewReg:()=>{
            return new Promise(async(resolve,reject)=>{
             let user =await db.get().collection(collection.REST_COLLECTION).find().toArray()
            resolve(user)
             
            })
        },
        deleteTodo:(userId)=>{
            return new Promise((resolve,reject)=>{
                db.get().collection(collection.REST_COLLECTION).deleteOne({_id:ObjectId(userId)}).then((response)=>{
                //db.get().collection(collection.TODO_COLLECTION).removeOne({_id:ObjectID(todoId)}).then((response)=>{
                   // console.log(response);
                    
                    resolve(userId)
                })
            })
    
        },
        editDetails:(proId)=>{
            return new Promise(async(resolve,reject)=>{
                let user=await db.get().collection(collection.REST_COLLECTION).findOne({_id:ObjectId(proId)})
                resolve(user)
            })
        },
        updateDetails:(proId,prodetails)=>{
            return new Promise((resolve,reject)=>{
                db.get().collection(collection.REST_COLLECTION)
                .updateOne({_id:ObjectId(proId)},{
                    $set:{
                        name:prodetails.name
                       
                    }
                }).then(()=>{
                    resolve()
                })
            })
    
        },
        doSignup:(userData)=>{
            return new Promise(async(resolve,reject)=>{
                userData.password=await bcrypt.hash(userData.password,10)
                db.get().collection(collection.LOGIN_COLLECTION).insertOne(userData).then((response)=>{
                    resolve(userData)
                })
            })
        },
        doLogin:(userData)=>{
            return new Promise(async(resolve,reject)=>{
                let response={}

                let status=false
                let user=await db.get().collection(collection.LOGIN_COLLECTION).findOne({username:userData.username})
                if(user){
                    bcrypt.compare(userData.password,user.password).then((status)=>{
                        if(status){
                            response.user=user
                            console.log('login successful');
                            resolve(response)

                        }else{
                            console.log('login failed');
                            response.user=user
                            resolve({response:false})
                            
                        }

                    })
                   
                    

                }else{
                    console.log('error');
                    
                }
            })
        }
        
}