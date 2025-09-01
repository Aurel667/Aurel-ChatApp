import { createContext, useContext, useState, useEffect } from "react"
import { createChat, getMyRooms } from "../api/rooms"
import { useAuth } from "./AuthContext"
import socket from "../config/socket"

const initialState = {
    currentRoom: null,
    rooms: [],
    setCurrentRoom: (roomId) => {},
    setRoomAtfirst: (roomId) => {},
    createContact: async (username) => {},
    setLastMessage: (message) => {}
}

const RoomContext = createContext(initialState)


export function RoomsProvider({children}){
    const {user} = useAuth()
    const [state, setState] = useState(() => ({ ...initialState }))
    useEffect(() => {
        const getRooms = async () =>{
            const rooms = await getMyRooms()
            if(rooms?.error) return;
            setState(prev => ({...prev, rooms: rooms}))
        }
        if(user?.username) getRooms();
    }, [user])

    useEffect(() => {
        socket.on('new_message', (message) => {

        })
    }, [socket])

    return (
        <RoomContext.Provider value={{
            currentRoom : state.currentRoom,
            rooms: state.rooms,
            setCurrentRoom: (roomId) => {
                if(state.currentRoom?._id) socket.emit('leave_room', state.currentRoom?._id)
                setState((prev) => ({...prev, currentRoom: state.rooms.find(room => room?._id == roomId)}))
                socket.emit('join_room', roomId)
            },
            setRoomAtfirst: (roomId) => {
                const room = state.rooms.find(room => room?._id == roomId)
                const rooms = state.rooms?.filter(room => room?._id != roomId)
                setState(prev => ({...prev, rooms: [room, ...rooms]}))
            },
            createContact: async (username) => {
                try {
                    const room = await createChat({username})
                    if(room?._id){
                        setState(prev => ({...prev, rooms: [room, ...prev.rooms]}))
                        this.setCurrentRoom(room._id)
                    }
                    return room
                } catch (error) {
                    return {
                        error: error.message
                    }
                }
            },
            setLastMessage: (message) => {
                setState(prev => ({
                    ...prev,
                    rooms: prev.rooms.map(room => room?._id == message?.room ? {...room, lastMessage: message} : room)
                }))
                this.setRoomAtfirst(message?.room)
            }
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export function useRooms(){
    return useContext(RoomContext)
}