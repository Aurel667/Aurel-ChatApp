import { MessageCircle } from "lucide-react";
import MessagesThread from "../components/MessagesThread";
import { RoomsList } from "../components/RoomsList";
import { useRooms } from "../stores/RoomsContext";

export default function Chat(){
    const {currentRoom} = useRooms()
    return (
        <>
        <div className="flex flex-row min-h-screen">
            <RoomsList />
            <div className="w-full min-h-screen">
                {currentRoom ? <MessagesThread /> : (
                    <div className="flex flex-col items-center mt-30">
                        <MessageCircle className="w-18 h-18 text-neutral-500"/>
                        <p className="text-neutral-200 text-3xl font-bold">AurelChat</p>
                        <p className="text-neutral-400 ">Ecrivez à vos amis</p>
                    </div>
                )}
            </div>
            
        </div>
        </>
    )
}