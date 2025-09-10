const User = require('../models/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
exports.auth = async (req, res, next) => {
    try {
        const isMobile = req.headers['user-agent']?.includes('iPhone') || req.headers['user-agent']?.includes('Android')
        const token = isMobile ? req.headers.authorization.split(' ')[1] : req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Non autorisé.' });
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log("Voici le user qui n'a pas été trouvé là",user)
            res.status(404).json({ error: 'Utilisateur non trouvé.' })
        };
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}