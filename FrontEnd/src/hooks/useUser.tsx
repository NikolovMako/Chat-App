import jwtDecode from "jwt-decode";
import React, { useContext, useMemo } from "react";
import { createContext } from "react";
import { DecodedUser } from "../components/Navigation";

const CurrentUserContext = createContext<{ name: string, id: string } | undefined>(undefined);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    let user = {
        id: '',
        name: ''
    }
    const storage = localStorage?.getItem('token');
    if (storage) {
        const decodedToken = jwtDecode<DecodedUser>(storage)
        user = {
            id: decodedToken._id,
            name: decodedToken.user
        }
    }

    const value = useMemo(
        () => (user),
        [user]
    );

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
};

const useUser = (): {
    user: { name: string; id: string; };
} => {
    const context = useContext(CurrentUserContext);

    if (context === undefined) {
        throw new Error("General hooks must be used within a GeneralProvider");
    }

    const { name, id } = context;

    return {
        user: {
            id,
            name
        }
    }
};

export { CurrentUserContext, useUser };