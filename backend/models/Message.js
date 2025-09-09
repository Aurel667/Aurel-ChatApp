const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  seen: {type: Boolean, default: false},
  replied:{
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message"}
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
