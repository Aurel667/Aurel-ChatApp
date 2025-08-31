import { useAuth } from "../stores/AuthContext"

export default function Chat(){
    const {logout} = useAuth()
    return (
        <>
        
        Mercon Aurel
        <button className="px-3 py-2 border rounded m-2" onClick={logout}>Déconnexion</button>
        </>
    )
}