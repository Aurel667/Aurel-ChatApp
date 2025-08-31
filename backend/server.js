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
    

io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté :', socket.id);

    

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté :', socket.id);
    });
});

server.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});