
import { createContext, useContext, useState } from "react";

const sessionContext = createContext();

export function useSession() {
    return useContext(sessionContext);
}

export function useUser() {
    return useSession().user;
}

export function useToken() {
    return useSession().token;
}

export function useLogin() {
    return useSession().login;
}

export function useLogout() {
    return useSession().logout;
}

function SessionProvider({ children }) {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("session")) || null
    );



//       const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem("session");
//       return stored ? JSON.parse(stored) : null;
//     } catch (error) {
//       return null;
//     }
//   });

    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    );


//       const [token, setToken] = useState(() => {
//     try {
//       const stored = localStorage.getItem("token");
//       return stored ? JSON.parse(stored) : null;
//     } catch (error) {
//       return null;
//     }
//   });

    const login = (userData) => {
        setUser(userData);
        setToken(userData.token);

        localStorage.setItem("session", JSON.stringify(userData));
        localStorage.setItem("token", JSON.stringify(userData.token));
        // localStorage.setItem("token", userData.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("session");
        localStorage.removeItem("token");
    };

    return (
        <sessionContext.Provider value={{ user, token, login, logout }}>
            {children}
        </sessionContext.Provider>
    );
}

export { SessionProvider, sessionContext };