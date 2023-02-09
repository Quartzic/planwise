import { useState } from "react";
import React from "react";
import { supabase } from "../lib/api";
import classNames from "classnames";
import {
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import {
    Transition
} from "@headlessui/react";
const TodoItem = ({ todo, onDelete }) => {
    const [completedAt, setCompletedAt] = useState(todo.completed_at);

    const toggleCompleted = async () => {
        // toggle completed_at

        let { data, error } = await supabase
            .from("todos")
            .update({ completed_at: completedAt ? null : new Date() })
            .eq("id", todo.id)
            .single()
            .select();

        if (error) {
            console.log("error", error);
        }
        setCompletedAt(data.completed_at);
    };
    return (
        <Transition as={React.Fragment} appear={true}
        show={true}
        enter="transition origin-center duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100 ">
        <div
            className={

                classNames(
                    completedAt ? "opacity-20 hover:opacity-50" : null,
                    "py-2 px-4 flex align-center cursor-pointer justify-between items-center bg-gray-100 hover:bg-gray-200 transition-all rounded"
                )
            }
            onClick={toggleCompleted}
        > 
            <span className={"truncate flex-grow"}>
                <input
                    className="cursor-pointer mr-2"
                    onChange={toggleCompleted}
                    type="checkbox"
                    checked={completedAt ? true : ""}
                />
                <span
                    className={`w-full flex-grow ${
                        completedAt ? "line-through" : ""
                    }`}
                >
                    {todo.task} {todo.duration ? `(${todo.duration} minutes)` : null}
                </span>
            </span>
            <button
                className={"text-neutral-500 hover:text-red-500 hover:scale-110 transition"}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
            >
                
                <XCircleIcon className={"h-8 w-8"} />
            </button>
        </div>
        </Transition>
    );
};

export default TodoItem;
