import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useMessage } from "../stores/MessagesContext";

export default function MessageInput(){
    const {sendMessage} = useMessage()
    const [state, setState] = useState({
        message: "",
    })
    const handleSendMessage = (e) => {
        e.preventDefault()
        if(state.message != null && state.message != ""){
            setState(prev => ({
                ...prev,
                message: ""
            }))
            sendMessage(state.message)
        } 
    }
    return (
        <>
        <form onSubmit={handleSendMessage} method="post" className="flex w-full items-center h-1/10  mt-auto border p-1">
            <input onChange={(e) => setState({message: e.target.value})} type="text" className="w-18/19 text-white text-sm ps-16 h-full placeholder:text-gray-400 focus:ring-0 focus:outline-none" placeholder="Tapez un message"/>
            <button type="submit" className="w-1/19 focus:ring-0 focus:outline-none hover:bg-gray-100/5 h-full rounded-md">
                <SendHorizonal className="w-4 h-4 text-gray-100 mx-auto"/>
            </button>
        </form>
        </>
    )
}