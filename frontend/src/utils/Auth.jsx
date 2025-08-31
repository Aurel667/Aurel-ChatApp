import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export default function Auth(){
    const {user} = useAuth();
    if(!user?.username) return <Navigate to="/" />;
    return <Outlet />;
}