import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { getMe } from "../api/auth";

export default function AutoAuth() {
  const { user, justLoggedIn, login, logout } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        if (userData?._id) {
          login(userData);
        }
      } catch {
        await logout();
      }
    };
    if (!user && justLoggedIn == false) fetchUser();
  }, [user, justLoggedIn]);

  return null;
}
