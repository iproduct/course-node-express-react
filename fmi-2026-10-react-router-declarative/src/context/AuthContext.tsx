/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";
import { fakeAuthProvider } from "../service/auth";

export type Voidfunction = () => void;

export interface AuthContextType {
    user: string | null;
    signin: (newUser: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    const signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };
    const value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

