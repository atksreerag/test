const express=require('express')
const router = express.Router()
const userHelpers=require('../helpers/restHelpers')
const jwt = require('jsonwebtoken')


let verifyAuth=(req,res,next)=>{
    let authHeader=req.headers.authorization
    if (authHeader==undefined) {
        res.status(401).send({error:'no token'})
    }
    let token=authHeader.split(" ").pop()
    jwt.verify(token,'secret',(err,decoded)=>{
        if (err) {
            res.status(500).send({error:'failed'})
        } else {
            next()
           // res.send(decoded)
        }
    })
}


router.get('/',verifyAuth,async(req,res)=>{
    try {
        userHelpers.viewReg().then((response)=>{
            console.log(response);
                
            res.status(200).json(response)
        
           })
        
    } catch (error) {
       
        console.log('erorr');
        
        
    }
   
       

    
    
    // try{
    //     const subs=await rest.find()
    //     res.send('jjj')

    // }catch{
    //     res.status(500).json({message:err.message})

    // }
   // res.send('got it my code')

})

router.post('/',(req,res)=>{
    try {
        userHelpers.doReg(req.body).then((response)=>{
            console.log(response);
            res.status(200).json(response)
            
    
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
    
    // const subs= new subs({
    //     name:req.body
    // })
    // try{
    //     const newSub= await subs.save()
    //     res.status(201).json(newSub)
    // }catch{
    //     res.status(400).json({message:err.message})
    // }

})
router.delete('/:id',(req,res)=>{
    try {
        var userId=req.params.id
        userHelpers.deleteTodo(userId).then((response)=>{
            console.log(userId);
            
            console.log('user deleted');
            
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
        
        
    }
   

})
 router.get('/:id',verifyAuth, async(req,res)=>{
     console.log(req.params.id);
    
     let response = await userHelpers.editDetails(req.params.id)
    console.log(response);
     res.status(200).json(response)
})
router.patch('/:id',async(req,res)=>{
    try {
        
        //let user = await userHelpers.editDetails(req.params.id)
        let response=await userHelpers.updateDetails(req.params.id,req.body)

            res.status(200).json(response)
        
        
    } catch (error) {
        console.log(error);
        res.send('error')
        
    }
    
})
router.post('/signup',async(req,res)=>{
    try {
        let response=await  userHelpers.doSignup(req.body)
        console.log(req.body);
  
    
    
    res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        
        
    }
  
})
router.post('/login',(req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
        if(response){
            let token=jwt.sign(response,'secret',{expiresIn:6000})
            console.log(token);
            
            res.status(200).send({auth:true,token:token})
           // res.send('git')

        }else{
            res.status(400).json(response)
        }
        
    })
})
// async function getUser(req,res,next){
//     if(req.params.id&&req.body){
//         userHelpers.viewOne(req.params.id,req.body).then((response)=>{
//             res.json(response)
//         })
//     }
//     else{
        
//         res.send('mad')
//     }
//     next()
// }


/*router.get('/:id',async(req,res)=>{
  let user=await userHelpers.viewOne(req.params.id)
  console.log(user);
  
  
  res.status(200).json(user)
  

})*/

module.exports = router