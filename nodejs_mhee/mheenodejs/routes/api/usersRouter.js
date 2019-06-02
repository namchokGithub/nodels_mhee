// API

var express = require('express');
var router = express.Router();
var User = require('../../models/userModels')
var _ = require('lodash')

//Get Users
router.get('/', function (req, res, next) {
  User.find().sort({name: 1}).exec((err, data) => {
    if(err){
        return res.status(500).send({err : {message : err.message , code : err.code}})
    }
    res.status(200).send(data)
  })
});

//Get User By Id
router.get('/:_id', function (req, res, next) {
    User.findById(req.params._id).exec((err, data) => {
      if(err){
          return res.status(500).send({err : {message : err.message , code : err.code}})
      }
      res.status(200).send(data)
    })
  });

  //Create Users
  router.post('/', function (req, res, next) {
    var user = new User(req.body)
    user.save((err,data)=>{
        if(err){
            return res.status(500).send({err : {message : err.message , code : err.code}})
        }
        res.status(200).send({success: {message: "Create user successfully"}})
    })
  })

  //Delete User
  router.delete('/:_id', function (req, res, next) {
    User.findByIdAndRemove(req.params._id).exec((err, data) => {
      if(err){
          return res.status(500).send({err : {message : err.message , code : err.code}})
      }
      res.status(200).send({success: {message: "Delete user successfully"}})
    })
  });

  //Update User
  router.put('/:_id', function (req, res, next) {
    User.findByIdAndUpdate(req.params._id,req.body,(err,data)=>{
        if(err){
            return res.status(500).send({err : {message : err.message , code : err.code}})
        }
        res.status(200).send({success: {message: "Update user successfully"}})
    })
  })

module.exports = router;
