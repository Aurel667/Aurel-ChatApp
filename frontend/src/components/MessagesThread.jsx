import { useEffect, useRef, useState } from "react"
import { useAuth } from "../stores/AuthContext"
import { useMessage } from "../stores/MessagesContext"
import MessageInput from "./MessageInput"
import MessageItem from "./MessageItem"
import ContactInfo from "./ContactInfo"
import { XCircle } from "lucide-react"

export default function MessagesThread(){
    const {user} = useAuth()
    const {messages, replied, resetRepliedMessage} = useMessage()
    const viewRef = useRef(null)
    useEffect(() => {
        if(viewRef){
            viewRef.current.scrollTop += viewRef.current.scrollHeight
        }
    }, [messages.length])

    return (
        <>
            <div className="flex flex-col min-h-screen bg-neutral-800 rounded-tl-lg bg-[url(/images/svg/doodle-brand.svg)]">
                <div className="flex h-[1/10] bg-neutral-800 w-full shadow-lg p-2 md:rounded-none rounded-tl-lg">
                    <ContactInfo />
                </div>
                <div ref={viewRef} className="w-full py-2 pb-2 h-[80vh] md:h-[72vh] px-4 overflow-x-hidden overflow-y-scroll rounded-tl-lg">
                    {messages?.length > 0 && messages?.map((message, index) => <MessageItem message={message} id={message?._id} index={index} messages={messages} user={user} key={message._id} />)}
                </div>
                {replied?.text && <a href={`#${replied?.message}`} className="w-full md:px-2 px-6">
                    <div className="flex items-center justify-between px-4 py-2 absolute md:w-[62vw] transform md:translate-x-0 -translate-x-4 bottom-4/9 md:bottom-16 rounded-t-xl bg-neutral-700/80">
                        <p className="text-sm text-white w-3/5"> {replied?.text} </p>
                        <button type="button" onClick={resetRepliedMessage}>
                            <XCircle className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </a>}
                <div className="h-full">
                    <MessageInput />
                </div>
            </div>
        </>
    )
} 