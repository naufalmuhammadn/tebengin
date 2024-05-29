import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsLogged(true);
                setUser(currentUser);
            } else {
                setIsLogged(false);
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <GlobalContext.Provider
        value={{
            isLogged,
            setIsLogged,
            user,
            setUser,
            loading,
        }}
        >
        {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;