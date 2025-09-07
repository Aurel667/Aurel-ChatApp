import { useRooms } from "../stores/RoomsContext"
import { useAuth } from "../stores/AuthContext"
import {CheckCheck, Search} from 'lucide-react'
import { useState } from "react"
import { useEffect } from "react"
import CreateChatContact from "./CreateChatContact"
export function RoomsList({closeList}){
    const {user} = useAuth()
    const {rooms, setCurrentRoom} = useRooms()
    const [state, setState] = useState({
        search: "",
        rooms: []
    })
    useEffect(() => {
        setState(prev => ({...prev, rooms: rooms}))
    }, [rooms])

    useEffect(() => {
        if(state.search != ""){
            setState(prev => ({...prev, rooms: rooms.filter(room => room?.name.toLowerCase().includes(state.search))}))
        }
        if(state.search == ""){
            setState(prev => ({...prev, rooms: rooms}))
        }
    }, [state.search])
    
    const handleRoomChange = (roomId) => {
        closeList()
        setCurrentRoom(roomId)
    }
    return (
        <>
        <div className="flex z-30 flex-col py-2 px-4 h-full w-full border-r rounded-tl-lg">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl text-white ">Discussions de {user?.username} </h1>
                <CreateChatContact />
            </div>
            <div className="flex my-2 w-full ">
                <input type="text" value={state.search} onChange={(e) => setState({...state, search: e.target.value})} placeholder="Rechercher une discussion" className="w-13/14 rounded-s-md bg-neutral-900/80 p-2 focus:outline-0 text-white placeholder:text-gray-300 text-sm placeholder:text-sm" />
                <div className="bg-neutral-900/80 w-1/14 rounded-e-md flex justify-center items-center px-2">
                    <Search className="w-4 h-4 text-gray-300"/>
                </div>
            </div>
            <div className="overflow-y-auto w-full h-8/10">
                {state.rooms.length > 0 ? state.rooms.map(room => (
                    <div onClick={() => handleRoomChange(room?._id)} key={room?._id} className="w-full px-4 pt-1 pb-2 my-1 animate-fade-in transition duration-300 hover:bg-neutral-700/90 rounded-lg cursor-pointer">
                        <div className="flex gap-2 items-center">
                            <div className="border border-gray-600 rounded-full min-w-8 min-h-8 bg-linear-to-br from-blue-500 to-fuchsia-500"></div>
                            <div className="w-full">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-white font-medium"> {room?.name} </p>
                                    {room?.lastMessage?.createdAt && <p className="text-gray-300 text-sm"> {new Date(room?.lastMessage?.createdAt).getHours()}:{new Date(room?.lastMessage.createdAt).getMinutes()} </p>}
                                </div>
                                <div className="flex justify-between w-full items-center gap-2">
                                    <p className="text-gray-300 text-sm flex items-center gap-1"> {(room?.lastMessage?.user == user?._id) && <CheckCheck className={`w-4 ${room?.lastMessage.seen ? "text-blue-300" : "text-gray-300"} h-4`} />} {room?.lastMessage?.text?.slice(0, 20)}...</p>
                                    {room?.unreadsCount > 0 && <div className="flex items-center justify-center font-bold p-2 rounded-full max-h-4 max-w-4 text-xs text-white bg-blue-600 "> {room?.unreadsCount} </div> }
                                </div>
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

        </div>
        



        {/* <button className="px-3 py-2 border rounded m-2" onClick={logout}>Déconnexion</button> */}
        </>
    )
}