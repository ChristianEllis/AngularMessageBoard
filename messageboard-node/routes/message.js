var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

//Retreive messages
router.get('/', function(req, res, next) {
  Message.find() // can add conditions
    .populate('user','fName')//expand data retreiving to get fName that made the message and store in DB
    .exec(function(err, docs) {
      if(err)
        return res.status(500).json({
          title: 'A server error occured',
          error: err
        });
      res.status(200).json({
        message: 'Success!',
        obj: docs
      });
    }); 
});

//Only continue if your authenticated
router.use('/', function(req, res, next) { //on each request this is reached
  jwt.verify(req.query.token, 'secret', function(err, decoded){ //notice secret is same in auth.service
    if(err) 
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    next();
  });
}); 

//Save a message
router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token); // decode token to see which user it belongs to
  User.findById(decoded.user._id, function(err, user) {
    if(err)
      return res.status(500).json({
        title: 'A server error occured',
        error: err
      });
    //if dont have an error, must have a valid token, therefore create the message
    var message = new Message ({
      content: req.body.content,
      user: user._id 
    });
    //save the message in the db
    message.save(function(err, result){
      if(err)
        return res.status(500).json({
          title: 'A server error occured',
          error: err
        }); 
      //add new message to array of messages created by user & save
      user.messages.push(result._id);
      user.save();
      console.log(result);
      //successful
      res.status(201).json({
        message: 'Saved message',
        username: user.fName,
        obj: result
      });
    });
  });
});

//Update a message
router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token); // decode token to see which user it belongs to
  Message.findById(req.params.id, function (err, message) {
    if (err) 
      return res.status(500).json({
        title: 'A server error occured',
        error: err
      }); 
    if (!message)
      return res.status(500).json({
        title: 'No message find',
        error: {message: 'Message not found'}
      });
    //if the user that created the message is differnt than the person trying to edit it
    if (message.user != decoded.user._id)
      return res.status(401).json({
        title: 'Not authenticated',
        error: {message: 'Users do not match'}
      });
    message.content = req.body.content;
    message.save(function(err, result){
      if(err)
        return res.status(500).json({
          title: 'A server error occured',
          error: err
        });
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

//Delete a message
router.delete('/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token); // decode token to see which user it belongs to
  Message.findById(req.params.id, function (err, message) {
    if (err) 
      return res.status(500).json({
        title: 'A server error occured',
        error: err
      }); 
    if (!message)
      return res.status(500).json({
        title: 'No message find',
        error: {message: 'Message not found'}
      });
    //if the user that created the message is differnt than the person trying to delete it
    if (message.user != decoded.user._id)
      return res.status(401).json({
        title: 'Not authenticated',
        error: {message: 'Users do not match'}
      });
    message.remove(function(err, result){
      if(err)
        return res.status(500).json({
          title: 'A server error occured',
          error: err
        });
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;