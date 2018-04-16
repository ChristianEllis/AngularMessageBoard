//Library Imports
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require("../models/user");

//Create a new user
router.post('/', function (req, res, next) {
    var user = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      password: bcrypt.hashSync(req.body.password, 10), //NEVER STORE IN PLAIN TEXT
      email: req.body.email
    });
    user.save(function(err, result) {
      if (err) 
        return res.status(500).json({
          title: 'A server error occured',
          error: err
        });
      res.status(201).json({
        message: 'User Created',
        obj: result
      });
    });
}); 

//Sign a user in
router.post('/signin', function (req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    //server error
    if (err) 
      return res.status(500).json({
        title: 'A server error occured',
        error: err
      });
    //invalid user
    if (!user) 
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid Login Credentials' }
      });
    //invalid password
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid Login Credentials' }
      });
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Log in success',
      token: token,
      userId: user._id
    });
  })
});

module.exports = router;