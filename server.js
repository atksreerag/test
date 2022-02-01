const express=require('express')
const app=express()

const db = require('./config/connection')
db.connect((err,data)=>{
  if(err){
    console.log('failed');
    
  }else{
    console.log('connected');
    
  }
})
app.use(express.json())
const indexRouter=require('./routes/index')
app.use('/',indexRouter)

app.listen(3000,()=>console.log('server connected on port 3000'));
