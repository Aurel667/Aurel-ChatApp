import MessagesThread from "../components/MessagesThread";
import { RoomsList } from "../components/RoomsList";
import { useRooms } from "../stores/RoomsContext";
import { useState } from "react";
import { EmptyMessage } from "../components/EmptyMessage";
import { MessageCircleMoreIcon } from "lucide-react";
import Disconnection from "../components/Disconnection";

export default function Chat(){
    const {currentRoom} = useRooms()
    const [show, setShow] = useState(true)
    return (
        <>
        <div className="pt-2 fixed w-screen md:ps-4 h-screen bg-neutral-900">
            <p className="text-xs text-white font-bold px-2 pb-2 flex items-center gap-2"> <img src="/images/logo.png" alt="logo" className="w-4 h-4" /> AurelChat App | Discussion actuelle: {currentRoom?.name || 'aucune'} </p>
            <div className="flex md:gap-4">
                <div className="w-1/15 md:w-[1vw] flex flex-col items-center justify-between p-2 border max-h-screen">
                    <button onClick={() => setShow(!show)} className="rounded-md p-2 hover:bg-neutral-700/80">
                        <MessageCircleMoreIcon className="text-white" />
                    </button>
                    <Disconnection className="absolute bottom-4" />
                </div>
                <div className="flex rounded-tl-lg w-full">
                    <div className={`md:relative fixed z-30 md:block animate-from-left-to-right rounded-tl-lg h-full ${show ? "block" : 'hidden'} h-screen md:w-1/3 bg-neutral-800`}>
                        <RoomsList closeList={() => setShow(false)} />
                    </div>
                    <div className="md:w-2/3 w-full bg-neutral-800 rounded-tl-lg">
                        {currentRoom?._id ? <MessagesThread /> : <EmptyMessage />}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}