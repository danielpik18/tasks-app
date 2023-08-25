"use client";

import { auth } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";

export const AuthContext = createContext<UserContext | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (newUser) => {
            if (newUser) {
                setUser({ id: newUser.uid, email: newUser.email } as User);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
