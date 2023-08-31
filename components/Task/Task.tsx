"use client";

import "./Task.css";
import { db } from "@/config/firebase-config";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Task({ id, title, description, done }: TaskType) {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const taskDropdownRef = useRef<any>(null);
    const dropdownButtonRef = useRef<any>(null);

    const toggleDone = async () => {
        const docToUpdate = doc(db, "tasks", id);
        await updateDoc(docToUpdate, {
            done: !done,
        });
    };

    const removeTask = async (event: MouseEvent) => {
        event.stopPropagation();
        await deleteDoc(doc(db, "tasks", id));
    };

    const handleClickOutside = (event: Event) => {
        if (
            popupOpen &&
            !taskDropdownRef.current?.contains(event.target) &&
            !dropdownButtonRef.current?.contains(event.target)
        ) {
            setPopupOpen(false);

            console.log("ran", popupOpen);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    });

    return (
        <div
            id={id}
            onClick={toggleDone}
            className={`flex w-full justify-between items-center w-5/5 md:w-4/5 lg:w-2/5 bg-gradient-to-tr from-slate-100 to-slate-200 rounded-xl p-4 group cursor-pointer`}
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center text-xs w-[50px] h-[50px] bg-white rounded-full cursor-pointer">
                    <img
                        className={`md:group-hover:block ${
                            done ? "" : "hidden opacity-50 saturate-0"
                        }`}
                        src="/img/check.svg"
                        alt=""
                    />
                </div>
                <div>
                    <h1 className="font-semibold">{title}</h1>
                    <p className="text-xs mt-2 text-slate-600 leading-snug whitespace-pre-line">
                        {description}
                    </p>
                </div>
            </div>

            <div className="relative w-[fit-content]">
                <button
                    ref={dropdownButtonRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!popupOpen) setPopupOpen(true);
                    }}
                    className="text-2xl -mt-4 ease-in duration-100 hover:scale-125"
                >
                    ...
                </button>

                <div
                    ref={taskDropdownRef}
                    className={`${
                        !popupOpen && "hidden"
                    } absolute -bottom-9 right-0 rounded bg-white hover:bg-red-500 ease-in duration-100`}
                >
                    <button
                        onClick={(e) => removeTask(e)}
                        className="w-[fit-content] whitespace-nowrap ease-in duration-100 text-sm text-red-500 hover:text-white font-semibold p-2"
                    >
                        Delete task
                    </button>
                </div>
            </div>
        </div>
    );
}
