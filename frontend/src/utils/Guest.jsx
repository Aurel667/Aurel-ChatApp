import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export default function Guest(){
    const {user} = useAuth();
    if(user) return <Navigate to="/chat" />;
    return <Outlet />;
}