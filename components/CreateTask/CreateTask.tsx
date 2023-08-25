"use client";

import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { AuthContext } from "@/contexts/AuthContext";

export default function CreateTask() {
    const { user } = useContext(AuthContext) as UserContext;

    // State
    const [taskTitle, setTaskTitle] = useState<string>();
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [showDescriptionBox, setShowDescriptionBox] =
        useState<boolean>(false);

    // Methods
    const createTask = async () => {
        if (taskTitle) {
            await addDoc(collection(db, "tasks"), {
                title: taskTitle,
                description: taskDescription,
                done: false,
                user_id: user?.id,
            });

            setTaskTitle("");
            setTaskDescription("");
            setShowDescriptionBox(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="justify-center flex items-center gap-2">
                <input
                    className="p-2 rounded text-sm w-full outline-none"
                    type="text"
                    placeholder="Write a new task here..."
                    required
                    onChange={(event) => setTaskTitle(event.target.value)}
                    value={taskTitle ? taskTitle : ""}
                />

                <button
                    type="submit"
                    onClick={createTask}
                    className="bg-emerald-500 rounded p-[3px] cursor-pointer hover:opacity-80 md:animate-bounce hover:animate-none"
                >
                    <img src="/img/pen.svg" className="w-[36px]" alt="" />
                </button>
            </div>

            <a
                className={`flex items-center gap-1 cursor-pointer text-slate-200 text-sm hover:underline mt-2 mb-1 ${
                    showDescriptionBox && "text-red-600"
                }`}
                onClick={() =>
                    setShowDescriptionBox((previousValue) => !previousValue)
                }
            >
                <img
                    className="w-[18px]"
                    src={`/img/${
                        !showDescriptionBox ? "plus.svg" : "minus.svg"
                    }`}
                    alt=""
                />
                {!showDescriptionBox ? "Add details" : "Remove details"}
            </a>

            <div className={`${!showDescriptionBox && "hidden"}`}>
                <textarea
                    className="rounded text-sm w-full p-2 outline-none"
                    placeholder="Enter any details about your task here"
                    name="text-description"
                    id="text-description"
                    cols={30}
                    rows={4}
                    onChange={(event) => setTaskDescription(event.target.value)}
                    value={taskDescription ? taskDescription : ""}
                ></textarea>
            </div>
        </form>
    );
}
