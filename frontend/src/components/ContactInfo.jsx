import { useEffect, useState } from "react"
import { useAuth } from "../stores/AuthContext"
import { useMessage } from "../stores/MessagesContext"
import { useRooms } from "../stores/RoomsContext"

export default function ContactInfo(){
    const {user} = useAuth()
    const {currentRoom} = useRooms()
    const {onlineUsers} = useMessage()
    const [state, setState] = useState({
        contact: null
    })
    useEffect(() => {
        setState(prev => ({
            ...prev,
            contact: onlineUsers?.find(contact => contact?.userId != user?._id),
        }))
    }, [onlineUsers.length])

    return (
        <div className="flex gap-2 items-center">
            <div className="border border-gray-600 rounded-full min-w-8 min-h-8 bg-linear-to-br from-blue-500 to-fuchsia-500"></div>
            <div className="flex flex-col justify-center">
                <p className="text-white font-medium"> {currentRoom.name} </p>
                <p className="text-xs text-white animate-fade-in"> {state.contact?.username ? "En ligne" : "Hors ligne"} </p>
            </div>
        </div>
    )
}