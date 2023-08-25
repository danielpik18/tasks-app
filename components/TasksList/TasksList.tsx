"use client";

import Task from "@/components/Task/Task";
import { db } from "@/config/firebase-config";
import {
    collection,
    getDocs,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import React from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useState, useEffect, useContext } from "react";

export default function TasksList() {
    const { user } = useContext(AuthContext) as UserContext;
    const [tasks, setTasks] = useState<Array<TaskType> | null>();

    const fetchTasks = async () => {
        try {
            const docs = await getDocs(
                query(
                    collection(db, "tasks"),
                    where("user_id", "==", user?.id),
                    orderBy("done", "desc")
                )
            );

            const data: Array<TaskType> | null = [];

            docs.forEach((doc) => {
                const taskData = { ...doc.data() };

                data.push({
                    id: doc.id,
                    title: taskData.title,
                    description: taskData.description,
                    done: taskData.done,
                });
            });

            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();

            onSnapshot(
                query(
                    collection(db, "tasks"),
                    where("user_id", "==", user?.id),
                    orderBy("done", "desc")
                ),
                (doc) => {
                    const updatedTasks: Array<TaskType> = [];

                    doc.docs.map((task) => {
                        const taskData = { ...task.data() };

                        updatedTasks.push({
                            id: task.id,
                            title: taskData.title,
                            description: taskData.description,
                            done: taskData.done,
                        });
                    });

                    console.log(updatedTasks);

                    setTasks(updatedTasks);
                }
            );
        }
    }, []);

    return (
        <>
            {tasks ? (
                tasks.map((doc) => {
                    const taskItem = (
                        <Task
                            key={doc.id}
                            id={doc.id}
                            title={doc.title}
                            description={doc.description}
                            done={doc.done}
                        />
                    );

                    return taskItem;
                })
            ) : (
                <p className="text-slate-100">Loading tasks...</p>
            )}
        </>
    );
}
