require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chatapp')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))
// .finally(() => mongoose.disconnect());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Auth routes
app.use('/api/auth', require('./routes/auth.route'));
// Room routes
app.use('/api/rooms', require('./routes/room.route'));
// Message routes
app.use('/api/messages', require('./routes/message.route'));

module.exports = app;