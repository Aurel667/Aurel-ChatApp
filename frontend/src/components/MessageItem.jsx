import { CheckCheck, Reply } from "lucide-react";
import { useMessage } from "../stores/MessagesContext";

export default function MessageItem({message, index, user, id, messages}){
    const {setRepliedMessage} = useMessage()
    const isMine = message.user?._id ? message.user._id === user._id : message.user === user._id;
    const previousIndex = index == 0 ? index : index -1;
    const previous = messages[previousIndex]
    const date = new Date(message.createdAt).toLocaleDateString();
    const previousDate = new Date(previous.createdAt).toLocaleDateString();
    return (
        <div className="flex flex-col">
            {(index == previousIndex) && (date == previousDate) && <p className="mx-auto text-sm text-white font-semibold py-1 text-center my-2 rounded-full bg-neutral-700/80 px-2"> {date == new Date().toLocaleDateString('fr-FR') ? "Aujourd'hui" : date} </p>}
            {(index != previousIndex) && (date != previousDate) && <p className="mx-auto text-sm text-white font-semibold py-1 text-center my-2 rounded-full bg-neutral-700/80 px-2"> {date == new Date().toLocaleDateString('fr-FR') ? "Aujourd'hui" : date} </p>}
            <div id={id} className={`flex items-center gap-2 my-1 ${isMine && "flex-row-reverse"} group`}>
                <div className={` flex flex-col max-w-1/2 p-1 ${isMine ? "bg-fuchsia-800/80 rounded-tl-md" : "bg-neutral-700 rounded-tr-md"} animate-fade-in rounded-b-md text-white`}>
                    {message?.replied?.text && <div className="rounded-md my-1 p-2 bg-fuchsia-500/20 shadow-md">
                        {message?.replied?.user == user?._id && <p className="text-fuchsia-200/90 font-semibold text-xs">Vous</p>}
                        <p className="text-sm text-white w-3/5"> {message?.replied?.text} </p>
                    </div>}
                    <div className="flex gap-2 justify-between items-center pb-1 px-2">
                        <p className="text-white text-sm"> {message?.text} </p>
                        <div className="flex items-center mt-5 gap-2">
                            <p className="text-gray-200 text-end text-[8pt]"> {new Date(message?.createdAt).getHours()}:{new Date(message?.createdAt).getMinutes()} </p>
                            {(message?.user == user?._id) && <CheckCheck className={`w-4 ${message.seen ? "text-blue-300" : "text-gray-300"} h-4`} />}
                        </div>
                    </div>
                </div>
                <button onClick={() => setRepliedMessage({message: message?._id, user: message?.user, text: message?.text})} className="group-hover:block hidden animate-fade-in rounded-full min-w-8 min-h-8 hover:bg-neutral-700/80" type="button" title="Répondre à ce message">
                    <Reply className="w-4 h-4 text-gray-200 mx-auto" /> 
                </button>
            </div>
        </div>
    )
}