import { useRooms } from "../stores/RoomsContext"
import { useAuth } from "../stores/AuthContext"
import {CheckCheck, Search} from 'lucide-react'
import { useState } from "react"
import { useEffect } from "react"
import CreateChatContact from "./CreateChatContact"
export function RoomsList(){
    const {logout, user} = useAuth()
    const {rooms, setCurrentRoom} = useRooms()
    const [state, setState] = useState({
        search: "",
        rooms: rooms
    })

    useEffect(() => {
        if(state.search != ""){
            setState(prev => ({...prev, rooms: rooms.filter(room => room?.name.toLowerCase().includes(state.search))}))
        }
        if(state.search == ""){
            setState(prev => ({...prev, rooms: rooms}))
        }
    }, [state.search])
    
    const handleRoomChange = (roomId) => {
        setCurrentRoom(roomId)
    }
    return (
        <>
        <div className="flex flex-col min-h-screen overflow-auto py-2 px-4 w-full md:w-2/5 border-r">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl text-white ">Discussions</h1>
                <CreateChatContact />
            </div>
            <div className="flex my-2">
                <input type="text" onChange={(e) => setState({...state, search: e.target.value})} placeholder="Rechercher une discussion" className="w-9/10 rounded-s-md bg-neutral-900/80 p-2 focus:outline-0 text-white placeholder:text-gray-300 text-sm placeholder:text-sm" />
                <div className="bg-neutral-900/80 rounded-e-md flex justify-center items-center px-2">
                    <Search className="w-4 h-4 text-gray-300"/>
                </div>
            </div>
            {state.rooms.length > 0 ? state.rooms.map(room => (
                <div onClick={() => handleRoomChange(room._id)} key={room._id} className="w-full px-4 pt-1 pb-2 my-1 transition duration-300 hover:bg-neutral-700/90 rounded-lg cursor-pointer">
                    <div className="flex gap-2 items-center">
                        <div className="border border-gray-600 rounded-full w-8 h-8 bg-linear-to-br from-blue-500 to-fuchsia-500"></div>
                        <div className="w-full">
                            <div className="flex justify-between w-full items-center">
                                <p className="text-white font-medium"> {room.name} </p>
                                {room?.lastMessage?.createdAt && <p className="text-gray-300 text-sm"> {new Date(room.lastMessage.createdAt).getHours()}:{new Date(room.lastMessage.createdAt).getMinutes()} </p>}
                            </div>
                            <p className="text-gray-300 text-sm flex items-center gap-1"> {room.lastMessage.user == user?._id && <CheckCheck className="w-4 text-blue-300 h-4"/>} {room?.lastMessage?.text} </p>
                        </div>
                    </div>
                </div>
            ))
            :
            <div className="text-center text-sm px-4 py-2 text-gray-100">
                Aucune disscussion.
            </div>
            }

        </div>
        



        {/* <button className="px-3 py-2 border rounded m-2" onClick={logout}>Déconnexion</button> */}
        </>
    )
}