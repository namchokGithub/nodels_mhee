var express = require('express');
var User = require('../models/userModels') // include models
var _ = require('lodash')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort({created_date: -1}).exec((err, data) => {
    res.render('user',{users : data})
  })
  // res.send('respond with a resource');
});

router.post('/add',function(req,res,next){
  console.log(req.body)
  var user = new User(req.body)
  user.save((err,data)=>{
    if(err) console.log(err)
    res.redirect('/users')
  })  
})

router.post('/delete/:_id',function(req,res,next){
  User.findByIdAndRemove(req.params._id,(err,data)=>{
    if(err) console.log(err)
    res.redirect('/users')
  })
})

router.post('/edit/:_id',function(req,res,next) {
  console.log(req.params._id, req.body)
  User.findByIdAndUpdate(req.params._id, req.body , (err,data)=>{
    if(err) console.log(err)
    res.redirect('/users')    
  })
})

router.get('/edit/:_id',function(req,res,next) {
  User.findById(req.params._id,(err,data)=>{
    if(err) console.log(err)
    res.render('user',{user: data})
  })
})

router.post('/search',function(req,res,next) {
  var search =_.omitBy(req.body,_.isEmpty)
  console.log(req.body,search)
  User.find(search, (err,data)=>{
    if(err) console.log(err)
    res.render('user',{users:data})    
  })
})
module.exports = router;
