"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type User = { name: string } | null;
type Ctx = { user: User; login: (n: string) => void; logout: () => void };
const Auth = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    return (
        <Auth.Provider value={{ user, login: n => setUser({ name: n }), logout: () => setUser(null) }}>
            {children}
        </Auth.Provider>
    );
}
export function useAuth() {
    const v = useContext(Auth);
    if (!v) throw new Error("AuthProvider로 감싸야 합니다");
    return v;
}