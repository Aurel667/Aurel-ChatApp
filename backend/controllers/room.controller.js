const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

exports.createRoom = async (req, res) => {
  const { name, contacts } = req.body;
  if (!name) return res.status(400).json({ error: 'Nom requis.' });
  if (!contacts || !contacts?.length) return res.status(400).json({ error: 'Contacts requis.' });
  const exists = await Room.findOne({ name });
  if (exists) return res.status(409).json({ message: 'Room déjà existante.' });
  const room = await Room.create({ name, isPrivate });
  res.status(201).json({ room });
};

exports.getMyRooms = async (req, res) => {
    try {
        const user = req.user
        let roomsMaping = []
        const rooms = await Room.find({users : user?._id})
        if(rooms?.length > 0){
            for (const room of rooms) {
                const contactsList = room?.users?.filter(id => id != user?._id)
                console.log(contactsList)
                const lastMessage = await Message.findOne({ roomId: room._id }).sort({ createdAt: -1 });
                if(room?.isChat && room.isPrivate){
                    const contact = await User.findOne({_id: contactsList[1]})
                    if(!contact) {continue;}
                    roomsMaping.push({
                        _id: room?._id,
                        name: contact?.username,
                        isPrivate: true,
                        isChat: true,
                        lastMessage: lastMessage
                    })
                }
                else {
                    let contacts = []
                    for(const id of contactsList){
                        const contact = await User.findOne({_id: id})
                        if(!contact) {continue;}
                        contacts.push({
                            _id: contact?._id,
                            username: contact?.username
                        })
                    }
                    roomsMaping.push({
                        _id: room?._id,
                        name: room?.name,
                        users: contacts,
                        iPrivate: room?.isPrivate,
                        isChat: false,
                        lastMessage: lastMessage,
                    })
                }
            }
        }
        return res.json(roomsMaping)
    } catch (error) {
        return res.status(500).json({error : "Erreur serveur"})
    }
}

exports.create2personChat = async (req, res) => {
    try {
        const creator = req.user
        const {username} = req.body
        const contact = await User.findOne({username})
        if(!contact) res.status(404).json({error: "Le contact n'existe pas"})
        const existings = await Room.find({
            users: { $all: [creator._id, contact._id] },
            isPrivate: true,
            isChat: true
        })
        existings.forEach((existing) => {
            if(existing.users?.length > 2){
                return res.status(409).json({error: "Une conversation avec cet utilisateur existe déjà."})
            }
        })
        const room = await Room.create({
            name: "default",
            isPrivate : true,
            isChat: true,
            users : [creator?._id, contact?._id]
        })
        return res.status(201).json({...room.toObject(), name: username})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : error.message})
    }
}