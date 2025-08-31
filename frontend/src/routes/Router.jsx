import {Routes, Route} from "react-router-dom"

//Middlewares pour routes protégées
import Auth from "../utils/Auth"
import Guest from "../utils/Guest"

//Composant pour les routes
import Login from "../pages/Login"
import Register from "../pages/Register"
import Chat from "../pages/Chat"


export default function Router() {
  return (
    <Routes>
      <Route element={<Guest />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Auth />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  )
}
