import { createContext, useContext, useState, useEffect } from "react"
import { getMyRooms } from "../api/rooms"
import { useAuth } from "./AuthContext"
const initialState = {
    currentRoom: null,
    rooms: [],
    setCurrentRoom: (roomId) => {},
    setLastMessageSentRoomAtfirst: (roomId) => {}
}

const RoomContext = createContext(initialState)

export function RoomsProvider({children}){
    const {user} = useAuth()
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const getRooms = async () =>{
            const rooms = await getMyRooms()
            console.log(rooms)
            if(rooms?.error) return;
            setState(prev => ({...prev, rooms: rooms}))
        }
        if(user?.username) getRooms();
    }, [user])

    return (
        <RoomContext.Provider value={{
            currentRoom : state.currentRoom,
            rooms: state.rooms,
            setCurrentRoom: (roomId) => {
                setState((prev) => ({...prev, currentRoom: roomId}))
            },
            setRoomAtfirst: (roomId) => {
                const room = state.rooms.find(room => room?._id == roomId)
                const rooms = state.rooms?.filter(room => room?._id != roomId)
                setState(prev => ({...prev, rooms: [room, ...rooms]}))
            }
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export function useRooms(){
    return useContext(RoomContext)
}