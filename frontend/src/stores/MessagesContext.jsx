import { createContext, useContext, useState, useEffect } from "react";
import socket from "../config/socket";
import { useAuth } from "./AuthContext";
import { useRooms } from "./RoomsContext";

const initialState = {
    messages: [],
    onlineUsers: [],
    sendMessage: (text) => {}
}

const MessageContext = createContext(initialState)

export function MessageProvider({children}){
    const {user} = useAuth()
    const {currentRoom, setRoomAtfirst, setLastMessage} = useRooms()
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const handleMessages = (messages) => {
            setState(prev => ({
                ...prev,
                messages: messages
            }))
        }
        const handleChatMessage = async (message) => {
            if(message?.room == currentRoom?._id){
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, message]
                }))
                setLastMessage(message)
                setRoomAtfirst(message.room)
            }
        }
        const handleOnlineUsers = (onlineUsers) => {
            setState(prev => ({...prev, onlineUsers: onlineUsers}))
        }
        socket.on('online_users', handleOnlineUsers)
        socket.on('messages', handleMessages)
        socket.on('chat_message', handleChatMessage)
        if(currentRoom?._id) socket.emit('join_room', {room: currentRoom._id, username: user?.username, userId: user?._id})
        return () => {
            socket.off('online_users', handleOnlineUsers)
            socket.off('messages', handleMessages);
            socket.off('chat_message', handleChatMessage);
        };
    }, [currentRoom?._id, socket])

    return (
        <MessageContext.Provider value={{
            onlineUsers: state.onlineUsers,
            messages: state.messages,
            sendMessage: (text) => {
                socket.emit('chat_message', {
                    user: user?._id,
                    room: currentRoom?._id,
                    text: text
                })
            }
        }}>
        {children}
        </MessageContext.Provider>
    )
}

export function useMessage(){
    return useContext(MessageContext)
}