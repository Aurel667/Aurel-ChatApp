require('dotenv').config()
const http = require('http')
const app = require('./app')
const {Server} = require('socket.io')

const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    },
});


const Message = require('./models/Message');
const Room = require('./models/Room');
const User = require('./models/User');

io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté :', socket.id);

    socket.on("join_room", async (roomId) => {
        try {
            socket.join(roomId)
            console.log('Room joined:', roomId)
            const messages = await Message.find({room: roomId})
            socket.emit(`messages`, messages)
        } catch (error) {
            socket.emit('error', error.message)
        }
    })
    
    socket.on('send_message', async (message) => {
        try {
            const newOne = await Message.create(message)
            console.log(newOne)
            io.to(newOne.room).emit('new_message', newOne)
        } catch (error) {
            
        }
    })

    

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté :', socket.id);
    });
});

server.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});