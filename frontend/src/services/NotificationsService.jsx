import { useEffect } from "react";
import { useRooms } from "../stores/RoomsContext";
import socket from "../config/socket";
import { useAuth } from "../stores/AuthContext";

function NotificationService(){
    const {user} = useAuth()
    const {currentRoom, setUnreadMessagesCount, setRoomAtfirst, setLastMessage} = useRooms()
    useEffect(() => {
        if(user?._id){
            socket.emit('user_join_alerts_channel', {user})
        }
    }, [user?._id])
    useEffect(() => {
        socket.on('message_alert', handleMessageAlert)
    }, [socket, currentRoom?._id])
    const handleMessageAlert = async (message) => {
        if((!currentRoom || (message?.room != currentRoom?._id)) && (message?.user != user?._id)){
            setLastMessage(message)
            setUnreadMessagesCount(message?.room)
            setRoomAtfirst(message?.room)
            if (!('Notification' in window)) {
                return;
            }
            const perm = await Notification.requestPermission();
            if (perm === 'granted') {
            new Notification(`Nouveau message de ${message?.sender}`, {
                body: `${message.text.slice(0, 20)}...`,
                icon: "images/logo.png",
                badge: "images/logo.png",
                tag: "AurelChat Notification",
                silent: true
            });
            }
        }
    }
    return null
}

export default NotificationService