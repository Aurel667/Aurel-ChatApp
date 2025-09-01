import { useAuth } from "../stores/AuthContext"
import { useMessage } from "../stores/MessagesContext"
import { useRooms } from "../stores/RoomsContext"
import MessageInput from "./MessageInput"

export default function MessagesThread(){
    const {user} = useAuth()
    const {currentRoom} = useRooms()
    const {messages} = useMessage()
    return (
        <>
            <div className="w-full min-h-screen bg-neutral-800">
                <div className="flex h-1/10 w-full shadow-lg ps-4">
                    <div className="flex gap-2 items-center">
                        <div className="border border-gray-600 rounded-full w-8 h-8 bg-linear-to-br from-blue-500 to-fuchsia-500"></div>
                        <p className="text-white font-medium"> {currentRoom.name} </p>
                    </div>
                </div>
                <div className="w-full h-8/10 overflow-auto p-4">
                    {messages.length > 0 && messages.map((message) => (
                        <div key={message?._id} className={`flex ${message?.user == user?._id ? "justify-end" : "justify-start"}`}>
                            <div className={` flex gap-2 items-center p-2 ${message?.user == user?._id ? "bg-blue-800/80 rounded-tl-md" : "bg-neutral-700 rounded-tr-md"} rounded-b-md text-white`}>
                                <p className="text-white text-sm"> {message.text} </p>
                                <p className="text-gray-200 text-end text-[8pt] mt-3"> {new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()} </p>
                            </div>
                        </div>
                    ))}
                </div>
                <MessageInput />
            </div>
        </>
    )
}