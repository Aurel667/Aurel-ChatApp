require('dotenv').config()
const http = require('http')
const app = require('./app')
const {Server} = require('socket.io')

const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true
    },
});


const Message = require('./models/Message');
const Room = require('./models/Room');
const User = require('./models/User');
const onlineUsers = {}
const allOnlineUsers = {}

io.on('connection', (socket) => {
    console.log('New user connected :', socket.id);

    socket.on('user_join_alerts_channel', ({user}) => {
        //l'utilisateur qui s'est authentifié peut rejoindre son canal de notification
        socket.join(user?._id)
        console.log("User connected to Alert channel: ", socket.id, ", ", user?.username, ", ", user?._id)
        //On l'enregistre parmi les utilisateurs connectés à l'app
        allOnlineUsers[socket.id] = {username: user.username, userId: user?._id}
        console.log('Online users now',allOnlineUsers)
    })
    
    socket.on('join_room', async ({room, username, userId}) => {
        //rejoindre la salle de discussion
        socket.join(room)

        //Récupérer tous les messages non lus par l'utilisateur entrant(ceux des autres quoi)
        const unreads = await Message.find({seen: false, room: room, user: {
            $ne: [userId]
        }})
        //Marquer les messages non lus par l'utilisateur en lu
        unreads?.forEach(async (element) => {
            element.seen = true;
            await element.save()
        });
        
        //Mettre à jour la liste des utilisateurs connectés à une salle
        //Si la room n'existe pas on l'initialise
        if(!onlineUsers[room]) onlineUsers[room] = [];
        //Dans la room, on ajoute l'utilisateur actuellement connecté
        onlineUsers[room] = [...onlineUsers[room], {username, userId, socketId: socket.id}]
        /* Dans la liste de tous les utilisateurs connectés,
         * on ajoute la salle à laquelle l'utilisateur connecté est actuellement connecté
         */
        allOnlineUsers[socket.id] = {...allOnlineUsers[socket.id], room: room}
        
        /**
         * On envoie la liste des utilisateurs connectés à cette salle à ceux qui y sont
         * déjà connectés
         */
        io.to(room).emit('online_users', onlineUsers[room])

        /**
         * On prend tous les messages de la salle.
         * Pour des raisons de performances, je vais limiter le nombre de messages envoyés plus tard,
         * parce que là, vraiment flemme
         */
        const messages = await Message.find({room: room})
        /** On envoie ça à tout ceux qui sont connectés, 
         * comme ça ils ont la mise à jour des mesages qui ont été vu  */
        io.to(room).emit('messages', messages)
    })

    socket.on('leave_room', ({roomId, userId}) => {
        /** L'utilisateur quitte la salle à laquelle il était connecté */
        socket.leave(roomId)

        /** On le retire de la liste des utilisateurs connectés dans la room */
        onlineUsers[roomId] = onlineUsers[roomId]?.filter(user => user?.userId != userId)

        /** On enlève la salle à l'utilisateur connecté */
        allOnlineUsers[socket.id] = {...allOnlineUsers[socket.id], room: null}

        //On signale aux autres utilisateurs qu'il a quitté la salle
        io.to(roomId).emit('online_users', onlineUsers[roomId])
    })

    socket.on('chat_message', async (message) => {
        //On vérifie si le destinataire est dans les users connectés à la salle
        const isReceiverOnline = onlineUsers[message?.room]?.find(user => user?.userId != message?.user) ? true : false;

        //S'il est en ligne (dans la salle) le nouveau message sera vu pour celui qui a envoyé, sinon ah
        const newOne = await Message.create({...message, seen: isReceiverOnline})

        /** On envoie le nouveau message à tout le monde connecté dans la salle,
         * le front se charge de montrer à qui il appartient
        */
        io.to(message.room).emit("chat_message", newOne)

        /**
         * Si le destinataire n'est pas en ligne,
         * on va lui envoyer une alerte pour lui montrer
         * qu'il a un message non lu d'une autre discussion
         */
        if(!isReceiverOnline){
            /** là on prend la room dans laquelle le message se trouve */
            const room = await Room.findById(message.room)
            const roomObject = {...room.toObject(), lastMessage: message}
            //On récupère l'_id du destinataire de l'alerte
            const receiverId = room.users?.find(user => user.toString() != message?.user)
            //On lui envoie l'alerte sur son canal d'alerte privé
            const sender = await User.findOne({_id: message.user})
            io.to(receiverId.toString()).emit("message_alert", {...newOne.toObject(), username: sender?.username, roomObject: {...roomObject, name: sender?.username}});

            console.log('Message alert sent to: ', receiverId.toString())
        }
    })


    socket.on('disconnect', () => {
        //À la déconnexion de l'utilisateur, il faut qu'il quitte les rooms et son canal d'alerte
        //Donc on vérifie que ses informations sont là avec l'id de son socket de connexion
        if(allOnlineUsers[socket.id]){
            console.log('Unconnected user :', allOnlineUsers[socket.id]);

            /**On récupère ses infos: son userId de bdd, son username,
             * et la dernière salle à laquelle il était connecté
            */
            const user = allOnlineUsers[socket.id]

            //On lui fait quitter son canal d'alerte privé
            socket.leave(user?.userId)

            //Si il était connecté à une salle, on lui fait quitter
            if(user?.room){
                socket.leave(user?.room);

                //On le retire des utilisateur connectés du registre
                onlineUsers[user?.room] = onlineUsers[user?.room]?.filter(item => item?.userId != user?.userId)

                //On signale aux autres utilisateurs qu'il est parti de la salle
                io.to(user?.room).emit('online_users', onlineUsers[user?.room])
            } 
            //on le supprime définitivement des utilisateurs connectés à l'app
            delete allOnlineUsers[socket.id];
            console.log('Online users now', allOnlineUsers)
        }
    });
});

server.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});