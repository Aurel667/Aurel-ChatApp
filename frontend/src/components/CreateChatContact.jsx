import { useState } from "react"
import { useRooms } from "../stores/RoomsContext"
import { AlertCircle, PenBox, X } from "lucide-react"

export default function CreateChatContact(){
    const [state, setState] = useState({
        modal: false
    })
    return (
        <>
        <button onClick={() => setState({...state, modal: true})} className="rounded p-2 hover:bg-neutral-700/80">
            <PenBox className="w-5 h-5 text-white"/>
        </button>
        {state.modal && <Modal closeModal={() => setState({modal: false})} />}
        </>
    )
}

function Modal({closeModal}){
    const [state, setState] = useState({
        username: "",
        loading: false,
        error: ""
    })
    const {createContact} = useRooms()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setState({...state, loading: true, error: ""})
        try {
            const room = await createContact(state.username)
            if(room?.error) setState(prev => ({...prev, error: room.error}))
            if(room?._id) closeModal()
        } catch (error) {
            setState({...state, error: error.message})
        }
        finally{
            setState({...state, loading: false})
        }
    }
    return (
        <>
        <div className="fixed flex justify-center py-6 w-screen h-[100vh] top-0 right-0 bg-neutral-900/80 z-10">
            <div className="rounded-md px-4 py-8 bg-neutral-800 w-4/5 md:w-1/3 space-y-4 h-fit mt-30">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-bold text-xl">Nouvelle discussion</h1>
                    <button onClick={closeModal} className="p-2 rounded-full hover:bg-neutral-700/80">
                        <X className="w-4 h-4 text-white"/>
                    </button>
                </div>
                {state.error != "" && (
                    <div className="flex gap-2 items-center border border-red-800/80 px-4 py-2 rounded-md bg-red-950/80 text-sm text-white">
                        <AlertCircle className="text-white w-4 h-4" /> Erreur : {state.error}
                    </div>
                )}
                <form onSubmit={handleSubmit} method="post" className="space-y-4">
                    <div className="grid gap-1">
                        <label htmlFor="username" min={3} required className="text-gray-100 text-sm">Nom d'utilisateur</label>
                        <input value={state.username} onChange={(e) => setState({...state, username: e.target.value})} type="text" placeholder="Nom d'utilisateur de votre ami" className="rounded border py-2 px-4 focus:outline-none text-white placeholder:text-gray-200 placeholder:text-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button className="text-white font-medium rounded-md py-2 px-4 bg-neutral-950">
                            {state.loading ? "Chargement..." : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}