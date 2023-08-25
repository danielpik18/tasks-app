"use client";

import {
    GoogleAuthProvider,
    OAuthCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase-config";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const signIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email: HTMLFormElement | null = document.querySelector("#email");
        const password: HTMLFormElement | null =
            document.querySelector("#password");

        if (!email || !email.value) {
            return alert("Wrong email...");
        }
        if (!password || !password.value) {
            return alert("Wrong password...");
        }

        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);
            return router.push("/tasks");
        } catch (error) {
            return console.log(error);
        }
    };

    const signInWithGoogle = () => {
        try {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential: OAuthCredential | null =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    console.log(user);

                    router.push("/tasks");

                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    // ...

                    console.log(errorMessage);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="flex flex-col items-start p-4 rounded w-full max-w-md bg-slate-100">
            <h1 className="text-xl mb-2 uppercase font-bold">Login</h1>

            <form
                className="w-full flex flex-col gap-3 my-5"
                onSubmit={(event) => signIn(event)}
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="p-2"
                        type="text"
                        placeholder="Email Address"
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
                    />
                </div>

                <button
                    className="bg-emerald-600 text-slate-100 uppercase font-semibold p-2 rounded ease-in duration-100 hover:opacity-80"
                    type="submit"
                >
                    Sign In
                </button>
            </form>

            <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 font-semibold text-blue-600 hover:opacity-75 cursor-pointer"
            >
                <img src="/img/google-logo.svg" alt="" />
                Sign in with Google
            </button>

            <Link
                className="font-semibold text-blue-600 hover:opacity-75 mt-5 block"
                href={"/register"}
            >
                Or... register your account
            </Link>
        </main>
    );
}
