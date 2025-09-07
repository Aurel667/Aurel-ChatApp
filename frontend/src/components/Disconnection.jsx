import { LogOut, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../stores/AuthContext"

export default function Disconnection({className}){
    const [state, setState] = useState({
        modal: false
    })
    return (
        <>
        <button onClick={() => setState({...state, modal: true})} className={`rounded ${className} p-2 hover:bg-neutral-700/80`}>
            <LogOut className="w-5 h-5 text-white"/>
        </button>
        {state.modal && <Modal closeModal={() => setState({modal: false})} />}
        </>
    )
}

function Modal({closeModal}){
    const {logout} = useAuth()
    return (
        <div className="fixed flex justify-center py-6 w-screen h-[100vh] top-0 right-0 bg-neutral-900/80 z-40">
            <div className="rounded-xl px-4 py-4 bg-neutral-800 w-3/5 md:w-1/3 space-y-4 h-fit mt-30 animate-fade-in">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-semibold tracking-tight text-lg">Déconnexion</h1>
                    <button onClick={closeModal} className="p-2 rounded-full hover:bg-neutral-700/80">
                        <X className="w-4 h-4 text-white"/>
                    </button>
                </div>
                <div className="space-y-4">
                    <h1 className="text-ld text-white font-semibold">Voulez vous vraiment vous déconnecter ?</h1>
                    <div className="flex items-center justify-between py-4">
                        <button onClick={closeModal} className="rounded-full text-sm px-4 py-2 text-white font-bold tracking-tight bg-neutral-700 hover:bg-neutral-700/80">Annuler</button>
                        <button onClick={logout} className="rounded-full text-sm px-4 py-2 text-white font-bold tracking-tight bg-red-900 hover:bg-red-900/80">Se déconnecter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}