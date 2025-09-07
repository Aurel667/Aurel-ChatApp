import { CheckCheck } from "lucide-react";

export default function MessageItem({message, index, user, messages}){
    const isMine = message.user?._id ? message.user._id === user._id : message.user === user._id;
    const previousIndex = index == 0 ? index : index -1;
    const previous = messages[previousIndex]
    const date = new Date(message.createdAt).toLocaleDateString();
    const previousDate = new Date(previous.createdAt).toLocaleDateString();
    return (
        <div className="flex flex-col">
            {(index == previousIndex) && (date == previousDate) && <p className="mx-auto text-sm text-white font-semibold py-1 text-center my-2 rounded-full bg-neutral-700/80 px-2"> {date == new Date().toLocaleDateString('fr-FR') ? "Aujourd'hui" : date} </p>}
            {(index != previousIndex) && (date != previousDate) && <p className="mx-auto text-sm text-white font-semibold py-1 text-center my-2 rounded-full bg-neutral-700/80 px-2"> {date == new Date().toLocaleDateString('fr-FR') ? "Aujourd'hui" : date} </p>}
            <div className={`flex my-1 ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={` flex gap-2 items-center p-2 ${isMine ? "bg-fuchsia-800/80 rounded-tl-md animate-from-right-to-left" : "bg-neutral-700 rounded-tr-md animate-from-left-to-right"} rounded-b-md text-white`}>
                    <p className="text-white text-sm"> {message?.text} </p>
                    <div className="flex items-center mt-5 gap-2">
                        <p className="text-gray-200 text-end text-[8pt]"> {new Date(message?.createdAt).getHours()}:{new Date(message?.createdAt).getMinutes()} </p>
                        {(message?.user == user?._id) && <CheckCheck className={`w-4 ${message.seen ? "text-blue-300" : "text-gray-300"} h-4`} />}
                    </div>
                </div>
            </div>
        </div>
    )
}