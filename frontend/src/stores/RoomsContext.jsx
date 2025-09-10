import { createContext, useContext, useState, useEffect } from "react"
import { createChat, getMyRooms } from "../api/rooms"
import { useAuth } from "./AuthContext"
import socket from "../config/socket"

const initialState = {
    currentRoom: null,
    rooms: null,
    setCurrentRoom: (roomId) => {},
    setRoomAtfirst: (roomId) => {},
    createContact: async (username) => {},
    setLastMessage: (message) => {},
    setUnreadMessagesCount: (roomId, count) => {}
}

const RoomContext = createContext(initialState)


export function RoomsProvider({children}){
    const {user} = useAuth()
    const [state, setState] = useState(() => ({ ...initialState }))
    useEffect(() => {
        const getRooms = async () =>{
            const rooms = await getMyRooms()
            if(rooms?.error) return;
            setState(prev => ({...prev, rooms: rooms?.reverse()}))
        }
        if(user?.username) getRooms();
    }, [user])

    return (
        <RoomContext.Provider value={{
            currentRoom : state.currentRoom,
            rooms: state.rooms,
            setCurrentRoom: (roomId) => {
                socket.emit('leave_room', {roomId: state.currentRoom?._id, userId: user?._id})
                setState((prev) => ({
                    ...prev, 
                    currentRoom: prev.rooms.find(item => item?._id == roomId),
                    rooms: prev.rooms.map(item => item?._id == roomId ? {...item, unreadsCount: 0} : item)
                }))
                return true
            },
            setRoomAtfirst: (roomId) => {
                setState(prev => ({...prev, rooms: [prev.rooms.find(room => room?._id == roomId), ...prev.rooms?.filter(room => room?._id != roomId)]}))
                return true
            },
            createContact: async (username) => {
                try {
                    const room = await createChat({username})
                    if(room?._id){
                        setState(prev => ({...prev, currentRoom: room, rooms: [room, ...prev.rooms]}))
                    }
                    return room
                } catch (error) {
                    return {
                        error: error.message
                    }
                }
            },
            setLastMessage: (message) => {

                setState(prev => {
                    const room = prev.rooms.find(item => item?._id == message?.room)
                    if(room){
                        return ({
                            ...prev,
                            rooms: prev.rooms.map(room => room?._id == message?.room ? {...room, lastMessage: message} : room)
                        })
                    }
                    else{
                        return ({
                            ...prev,
                            rooms: [message?.roomObject, ...prev.rooms]
                        })
                    }
                })
                return true
            },
            setUnreadMessagesCount: (roomId) => {
                setState(prev => ({
                    ...prev,
                    rooms: prev.rooms.map(room =>
                        room._id === roomId
                            ? { ...room, unreadsCount: (room.unreadsCount ? room.unreadsCount : 0) + 1 }
                            : room
                    )
                }))
                return true
            }
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export function useRooms(){
    return useContext(RoomContext)
}