"use client";

import Link from "next/link";
import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { rejects } from "assert";

export default function Register() {
    const router = useRouter();

    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email: HTMLFormElement | null = document.querySelector("#email");
        const password: HTMLFormElement | null =
            document.querySelector("#password");
        const confirmPassword: HTMLFormElement | null =
            document.querySelector("#confirm-password");

        if (!email || !email.value) {
            return alert("Wrong email...");
        }
        if (!password || !password.value) {
            return alert("Wrong password...");
        }
        if (!confirmPassword || !confirmPassword.value) {
            return alert("Wrong password confirmation...");
        }

        if (password.value != confirmPassword.value) {
            return alert("Passwords don't match");
        }

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email.value,
                password.value
            );

            if (res.user) {
                await addDoc(collection(db, "tasks"), {
                    title: "Buy groceries",
                    description: `x4 Apples
                    x1 Bottle of milk
                    x1 Box of eggs
                    `,
                    done: true,
                    user_id: res.user.uid,
                });

                await addDoc(collection(db, "tasks"), {
                    title: "Take the cat to the vet",
                    description: "",
                    done: false,
                    user_id: res.user.uid,
                });
            }

            return router.push("/tasks");
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <main className="p-4 rounded w-full max-w-md bg-slate-100">
            <h1 className="text-xl mb-2 uppercase font-bold">Register</h1>

            <form
                className="flex flex-col gap-3 my-5"
                onSubmit={(event) => registerUser(event)}
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="p-2"
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="p-2"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs" htmlFor="confirm-password">
                        Confirm password
                    </label>
                    <input
                        id="confirm-password"
                        className="p-2"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <button
                    className="bg-emerald-600 text-slate-100 uppercase font-semibold p-2 rounded ease-in duration-100 hover:opacity-80"
                    type="submit"
                >
                    Register
                </button>
            </form>

            <Link
                className="font-semibold text-blue-600 hover:opacity-75"
                href={"/login"}
            >
                Or... Sign in
            </Link>
        </main>
    );
}
