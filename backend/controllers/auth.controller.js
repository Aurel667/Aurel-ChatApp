const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Champs requis.' });
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: 'Utilisateur déjà existant.' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    const token = jwt.sign({ _id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.status(201).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.status(401).json({ message: 'Identifiants invalides.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Identifiants invalides.' });
    const { password : _, ...userData } = user.toObject();
    const token = jwt.sign({ ...userData }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ ...userData });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id})
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    const { password: _, ...userData } = user.toObject();
    res.json({ ...userData });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Déconnexion réussie.' });
};
