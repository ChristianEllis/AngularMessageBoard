var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')

var schema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});


//middleware to remove a message from a user message array
schema.post('remove', function(message) {
  User.findById(message.user, function(err, user) {
    user.messages.pull(message._id);
    user.save(); //make the changes in the DB
  })
});

module.exports = mongoose.model('Message', schema);