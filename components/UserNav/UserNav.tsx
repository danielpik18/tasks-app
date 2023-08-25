"use client";

import React, { useContext } from "react";
import { auth } from "@/config/firebase-config";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function UserNav() {
    const { user } = useContext(AuthContext) as UserContext;
    const router = useRouter();

    const logout = () => {
        signOut(auth);
        router.push("/login");
    };

    return (
        <div className="absolute top-4 right-50 md:right-4">
            {user ? (
                <div>
                    <button
                        className="flex items-center gap-1 text-slate-100 hover:underline"
                        onClick={logout}
                    >
                        <img className="w-[20px]" src="/img/user.svg" alt="" />
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <Link
                        className="flex items-center gap-1 text-slate-100 hover:underline"
                        href={"/login"}
                    >
                        <img
                            className="w-[20px]"
                            src="/img/sign-in.svg"
                            alt=""
                        />
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
}
