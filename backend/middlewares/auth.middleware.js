const User = require('../models/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Non autorisé.' });
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded._id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({error: "Bad request"})
    }
}