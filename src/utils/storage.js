const STORAGE_KEY = 'todo_v1';

export function loadTodosFromStorage(){
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);

        if(Array.isArray(parsed)) return parsed;
        return [];
    } catch (error) {
        console.warn("Could not read from LocalStorage", error)
        return [];
    }
}

export function saveTodosToStorage(todos){
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.warn("Could not save to LocalStorage");
        throw error;
    }
}