const express = require('express');
const router = express.Router();
const c = require('../controllers/message.controller');
const {auth} = require('../middlewares/auth.middleware')

router.get('/:roomId',auth, c.getMessages);
router.post('/:roomId',auth, c.createMessage);
router.put('/:id', auth, c.updateMessage)

module.exports = router;
