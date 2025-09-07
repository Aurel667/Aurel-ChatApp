const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, unique: false, required: false, default: null },
  isPrivate: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isChat: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
