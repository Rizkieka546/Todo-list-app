import { useEffect } from "react"
import { useReducer } from "react"
import { loadTodosFromStorage, saveTodosToStorage } from "../utils/storage"
import { createContext } from "react"
import { useContext } from "react";

const TodosStateContext = createContext();
const TodosDispatchContext = createContext();

const initialState = {
    todos: []
}

function todosReducer(state, action){
    switch (action.type) {
        case "LOAD":
            return { ...state, todos: action.payload || []}
        case "ADD":
            return { ...state, todos: [...state.todos, action.payload]}
        case "TOGGLE":
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.payload ? {...t, completed: !t.completed} : t
                )
            }
        case "DELETE": 
            return {...state, todos: state.todos.filter(t => t.id !== action.payload)}
        case 'EDIT':
            return {
                ...state, todos: state.todos.map(t => 
                    t.id === action.payload.id ? {...t, text: action.payload.text} : t
                )
            }
        default:
            throw new Error(`Unknow action ${action.type}`)
    }
}

export function TodosProvider({ children }) {
    const [state, dispatch] = useReducer(todosReducer, initialState);

    useEffect(() => {
        const stored = loadTodosFromStorage();
        if (stored) dispatch({ type: "LOAD", payload: stored });
    }, []);

    useEffect(() => {
        try {
            saveTodosToStorage(state.todos);
        } catch (error) {
            console.error("Error saving todos:", error);
        }
    }, [state.todos]);

    return (
        <TodosStateContext.Provider value={state}>
            <TodosDispatchContext.Provider value={dispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosStateContext.Provider>
    );
}


export function useTodosState(){
    const ctx = useContext(TodosStateContext);
    if (!ctx) throw new Error("useTodosState must be used within TodosProvider");
    return ctx;
}

export function useTodosDispatch(){
    const ctx = useContext(TodosDispatchContext);
    if (!ctx) throw new Error("useTodosDispatch must be used within TodosProvider");
    return ctx;
}