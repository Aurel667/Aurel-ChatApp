import { MessageCircle } from "lucide-react";
import { useAuth } from "../stores/AuthContext";

export function EmptyMessage(){
    const {user} = useAuth()
    return (
        <div className="flex flex-col min-h-screen items-center mt-30">
            <img src="/images/logo.png" alt="AurelChatApp" className="w-24 h-24" />
            <p className="text-neutral-200 text-3xl font-bold">AurelChat</p>
            <p className="text-neutral-400 ">Ecrivez à vos amis</p>
            <p className="text-neutral-400 "> {user?._id} </p>
        </div>
    )
}