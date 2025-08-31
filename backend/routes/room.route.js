const express = require('express');
const router = express.Router();
const c = require('../controllers/room.controller');
const {auth} = require('../middlewares/auth.middleware')

router.get('/my-rooms', auth, c.getMyRooms);
router.post('/chat', auth, c.create2personChat);
router.post('/group', auth, c.createRoom);

module.exports = router;
