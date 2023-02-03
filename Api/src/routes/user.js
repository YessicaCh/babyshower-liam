const express = require("express");
const { json } = require("express/lib/response");
const path  = require('path');


const router = express.Router();
const userSchema = require("../models/user");
const giftSchema = require("../models/gifts");

//create user 
router.post('/users',(req,res) =>{
    console.log('Llegue a Users')
    if (req.body.idGift == null){
        dict = {
            name : req.body.giftName,
            status: false,
            limit:1,
            counter:1,
            imgsrc:''
        }
        const gift = giftSchema(dict);
        gift.save()
        .then((data)=>{
            
            
            req.body.idGift = gift._id
            const user = userSchema(req.body);
            user.save()
            .then((data)=>{
                res.setHeader("Content-Type", "text/html")
                res.send(`
                <p> Se guardo de forma exitosa vuelva a </p>
                <a href="https://babyshower2022.herokuapp.com/">Pagina Principal</a>
                `)
            })
            .catch((error)=>res.json({message :error}));
                
            })
        .catch((error)=>res.json({message :error}));

        
    }else{
        const user = userSchema(req.body);

        user.save()
        .then((data)=>{
            giftSchema.findById(req.body.idGift)
            .then((data)=>{
                giftSchema.updateOne({_id:req.body.idGift},
                    { $set:{counter:data.counter + 1}})
                    .then((data)=>{
                        console.log('update contador')
                    })
                    .catch((error)=>res.json({message :error}));
    
                giftSchema.findById(req.body.idGift)
                    .then((data)=>{
                        res.json(data)
                    }).catch((error)=>res.json({message :error}));
            })
            .catch((error)=>res.json({message :error}));
            
        })
        .catch((error)=>{
            console.log(error)
            res.json({message :error})});

    }
   
    // res.send("create user")
    
})

//get all users
router.get('/users',(req,res) =>{

    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
    // res.send("create user")
})

//get id user 
router.get('/users/:id',(req,res) =>{
    const {id} =  req.params;

    userSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
    // res.send("create user")
})

router.put('/users/:id',(req,res) =>{
    const {id} =  req.params;
    const {name,age,email} =  req.body;

    userSchema
    .updateOne({_id:id},{ $set:{name,age,email}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
    // res.send("create user")
})

router.delete('/users/:id',(req,res) =>{
    const {id} =  req.params;

    userSchema
    .remove({_id:id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
    // res.send("create user")
})

module.exports = router;
