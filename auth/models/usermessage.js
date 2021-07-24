const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  allmessage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const usermessage = mongoose.model('usermessage', UserSchema);

module.exports = usermessage;
