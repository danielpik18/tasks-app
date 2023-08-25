"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const { user } = useContext(AuthContext) as UserContext;

    if (!user) {
        return router.push("/login");
    }

    return router.push("/tasks");
}
