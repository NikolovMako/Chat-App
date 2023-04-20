import React, { useEffect, useState } from "react";
import { createContext } from "react";

const UserContext = createContext<any>('');

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token !== '' && token !== undefined && token !== null) {
        return token
    }
    return '';
};

export const TokenProvider = ({ children }: { children: any }) => {
    const [token, setToken] = useState<string | undefined>('');

    useEffect(() => {
        setTimeout(() => {
            const checkLoggedIn = () => {
                let cuser = isAuthenticated();
                if (cuser === '') {
                    localStorage.setItem('token', '');
                    cuser = '';
                }
                setToken(cuser);
            };
            checkLoggedIn();
        }, 200)


    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
