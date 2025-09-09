import { useEffect, useRef } from "react"
import { useAuth } from "../stores/AuthContext"
import { useMessage } from "../stores/MessagesContext"
import MessageInput from "./MessageInput"
import MessageItem from "./MessageItem"
import ContactInfo from "./ContactInfo"

export default function MessagesThread(){
    const {user} = useAuth()
    const {messages} = useMessage()
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
                <div ref={viewRef} className="w-full py-2 pb-2 h-[40vh] md:h-[75vh] px-4 overflow-x-hidden overflow-y-scroll rounded-tl-lg">
                    {messages?.length > 0 && messages?.map((message, index) => <MessageItem message={message} index={index} messages={messages} user={user} key={message._id} />)}
                </div>
                <div className="h-full">
                    <MessageInput />
                </div>
            </div>
        </>
    )
} 