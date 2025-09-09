import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useMessage } from "../stores/MessagesContext";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function MessageInput(){
    const {sendMessage} = useMessage()
    const [state, setState] = useState({
        message: "",
        emoji: false
    })
    const handleSendMessage = (e) => {
        e.preventDefault()
        if(state.message != null && state.message != ""){
            setState(prev => ({
                ...prev,
                message: "", 
            }))
            sendMessage(state.message)
        } 
    }
    return (
        <>
        <form onSubmit={handleSendMessage} method="post" className="flex justify-between gap-2 items-center min-h-fit bg-neutral-800 border border-neutral-800 rounded-full px-2 md:mt-0 mt-2 mx-4 shadow-lg">
            <div className="w-fit">
                <button type="button" onClick={() => setState({...state, emoji: !state.emoji})} className="w-fit text-lg focus:ring-0 focus:outline-none hover:bg-gray-100/5 h-full rounded-full p-2">
                    🙂
                </button>
                {state.emoji && <div className="absolute top-0 md:top-15">
                    <Picker data={data} onEmojiSelect={(emoji) => setState({...state, message: state.message + " " + emoji?.native, emoji: false})} />
                </div>}
            </div>
            <input
                value={state.message}
                onChange={(e) => setState({message: e.target.value})}
                type="text"
                className="w-9/10 text-white text-sm border border-neutral-800 py-4 h-full placeholder:text-gray-400 focus:ring-0 focus:outline-none resize-none"
                placeholder="Tapez un message"
            />
            <button type="submit" className="w-fit focus:ring-0 focus:outline-none hover:bg-gray-100/5 h-full rounded-full p-3">
                <SendHorizonal className="w-5 h-5 text-gray-100 mx-auto"/>
            </button>
        </form>
        </>
    )
}