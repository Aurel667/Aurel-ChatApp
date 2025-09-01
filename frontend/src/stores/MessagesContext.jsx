import { createContext, useContext, useState, useEffect } from "react";
import socket from "../config/socket";
import { useAuth } from "./AuthContext";
import { useRooms } from "./RoomsContext";

const initialState = {
    messages: [],
    sendMessage: (text) => {}
}

const MessageContext = createContext(initialState)

export function MessageProvider({children}){
    const {user} = useAuth()
    const {currentRoom, setRoomAtfirst, setLastMessage} = useRooms()
    const [state, setState] = useState(initialState)
    useEffect(() => {
        socket.on('messages', (messages) => {
            console.log(messages)
            setState(prev => ({
                ...prev,
                messages: messages
            }))
        })
        socket.on('new_message', ({message}) => {
            if(message?.room == currentRoom?._id){
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, message]
                }))
                setRoomAtfirst(currentRoom?._id)
            }
        })
    }, [socket])
    return (
        <MessageContext.Provider value={{
            messages: state.messages,
            sendMessage: (text) => {
                socket.emit('send_message', {
                    user: user?._id,
                    room: currentRoom?._id,
                    text: text
                })
                setRoomAtfirst(currentRoom?._id)
            }
        }}>
        {children}
        </MessageContext.Provider>
    )
}

export function useMessage(){
    return useContext(MessageContext)
}