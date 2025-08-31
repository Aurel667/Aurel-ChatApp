const express = require('express');
const router = express.Router();
const c = require('../controllers/auth.controller');
const {auth} = require('../middlewares/auth.middleware')

router.post('/register', c.register);
router.post('/login', c.login);
router.get('/me',auth, c.me);
router.get('/logout', auth, c.logout);

module.exports = router;
