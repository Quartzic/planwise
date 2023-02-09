import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/api";
import RecoverPassword from "../components/RecoverPassword";
import TodoItem from "../components/TodoItem";
// import lockup svg from assets/lockup.svg
import { useAuth } from "../components/Auth";
import { Link } from "react-router-dom";
import lockup_white from "../assets/lockup-white.svg";
import Confetti from "react-dom-confetti";

const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const HomePage = () => {
    let auth = useAuth();

    const [confettiActive, setConfettiActive] = useState(false);
    const [recoveryToken, setRecoveryToken] = useState(null);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const newTaskTextRef = useRef();
    const [errorText, setError] = useState("");

    useEffect(() => {
        /* Recovery url is of the form
         * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
         * Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
         */
        let url = window.location.hash;
        let query = url.slice(1);
        let result = {};

        query.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });

        if (result.type === "recovery") {
            setRecoveryToken(result.access_token);
        }

        fetchTodos().catch(console.error);
    }, []);

    const fetchTodos = async () => {
        let { data: todos, error } = await supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: false });
        if (error) console.log("error", error);
        else {
            setTodos(todos);
            setLoading(false);
        }
    };

    // run fetchTodos every second
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTodos();
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    // trigger confetti when no more todos
    useEffect(() => {
        if (todos.length === 0 && loading === false) {
            setConfettiActive(true);
        }
    }, [todos]);

    const deleteTodo = async (id) => {
        try {
            await supabase.from("todos").delete().eq("id", id);
            setTodos(todos.filter((x) => x.id !== id));
        } catch (error) {
            console.log("error", error);
        }
    };

    const deleteAllTodos = async () => {
        try {
            await supabase
                .from("todos")
                .delete()
                .eq("user_id", auth.session.user.id);
            setTodos([]);
        } catch (error) {
            console.log("error", error);
        }
    };

    const addTodo = async () => {
        let taskText = newTaskTextRef.current.value;
        let task = taskText.trim();
        if (task.length <= 3) {
            setError("Task length should be more than 3!");
        } else {
            console.log(auth.session.user.id);
            let { data: todo, error } = await supabase
                .from("todos")
                .insert({ task, user_id: auth.session.user.id })
                .select()
                .single();
            if (error) setError(error.message);
            else {
                setTodos([todo, ...todos]);
                setError(null);
                newTaskTextRef.current.value = "";
            }
        }
    };

    const handleLogout = async () => {
        auth.signOut();
    };

    return recoveryToken ? (
        <RecoverPassword
            token={recoveryToken}
            setRecoveryToken={setRecoveryToken}
        />
    ) : (
        <>
            <div className={"flex m-4 mb-0 h-10"}>
                <input
                    ref={newTaskTextRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addTodo()}
                    className={
                        "bg-neutral-100 border px-2 border-gray-300 w-full mr-4 rounded"
                    }
                />
                <button
                    onClick={addTodo}
                    className={
                        "w-8 flex justify-center py-2 px-12 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    }
                >
                    Add
                </button>
                <button
                    onClick={deleteAllTodos}
                    className={
                        "w-8 ml-4 flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-red-500 focus:outline-none active:bg-red-700 transition duration-150 ease-in-out"
                    }
                >
                    Clear
                </button>
            </div>
            <div className={"flex flex-col flex-grow gap-2 p-4"}>
                {todos.length ? (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={() => deleteTodo(todo.id)}
                        />
                    ))
                ) : (
                    <span
                        className={
                            "py-8 h-full flex justify-center items-center"
                        }
                    >
                        <Confetti
                            active={confettiActive}
                            config={confettiConfig}
                            className="max-h-full max-w-screen"
                        />
                        No more tasks for today! 🎉
                    </span>
                )}
            </div>
            {!!errorText && (
                <div
                    className={
                        "border max-w-sm self-center px-4 py-2 mt-4 text-center text-sm bg-red-100 border-red-300 text-red-400"
                    }
                >
                    {errorText}
                </div>
            )}
        </>
    );
};

export default HomePage;
