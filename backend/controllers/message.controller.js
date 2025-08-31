const Message = require('../models/Message');
const User = require('../models/User');
const Room = require('../models/Room');

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ room: roomId }).populate('user', 'username').sort({ createdAt: 1 });
  res.json({ messages });
};

exports.createMessage = async (req, res) => {
  const { roomId } = req.params;
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Message requis.' });
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Non autorisé.' });
  const message = await Message.create({ room: roomId, user: userId, text });
  res.status(201).json({ message });
};


exports.updateMessage = async (req, res) => {
    try {
        const {text} = req.body.text
        if(!text) res.status(404).json({error: "Le texte n'est pas présent"})
        const message = await Message.findOne({_id: req.params.id})
        if(!message) res.status(404).json({error: "Le messsage que vous voulez modifier n'existe pas."})
    } catch (error) {
        res.status(500).json({error: "Erreur serveur"})
    }
}