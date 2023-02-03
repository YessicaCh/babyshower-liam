const express = require("express");
const fs = require('fs');

const router = express.Router();
const giftSchema = require("../models/gifts");

//create gifts
router.post('/gifts',(req,res) =>{
    req.body.status = true
    req.body.imgsrc = 'dbImg/'+req.file.filename
    const gift = giftSchema(req.body);
    gift.img = {
      data: req.file.buffer,
      contentType:req.file.mimetype,
    }
    
    gift.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
    // res.send("create user")
})

//get all gifts
router.get('/gifts',(req,res) =>{

    giftSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
})

//get id gifts
router.get('/gifts/:id',(req,res) =>{
    const {id} =  req.params;

    giftSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message :error}));
})

router.delete('/gifts/:id',(req,res) =>{
  const {id} =  req.params;

  giftSchema
  .remove({_id:id})
  .then((data)=>res.json(data))
  .catch((error)=>res.json({message :error}));
  // res.send("create user")
})


module.exports = router;
