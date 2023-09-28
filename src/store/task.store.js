import { Task } from '../tasks/models/Task.model'

// functions for manage the state logic
const initState = () => {
    loadStore();
    console.log('Start state!');
}

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    tasks: [
        new Task('Task App'),
        new Task('Task App'),
        new Task('Task App'),
        new Task('Task App'),
    ],
    filter: Filters.All,
}

// manage state in the browser
const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {tasks = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.filter = filter;
    state.tasks = tasks;
}

const saveStateLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

// main functions
const addTask = (title) => {
    if (!title) throw new Error('Title is required');
    state.tasks.push(new Task(title));
    saveStateLocalStorage();
}

const changeTask = (taskId) => {
    state.tasks = state.tasks.map(task => {
        if (task.id === taskId) {
            task.done = !task.done;
        }

        return task;
    });
    saveStateLocalStorage();
}

const deleteTask = (taskId) => {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
    saveStateLocalStorage();
}

const deleteCompleted = () => {
    state.tasks = state.tasks.filter(task => task.done);
    saveStateLocalStorage();
}

const getTasks = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.tasks];
        case Filters.Completed:
            return state.tasks.filter(task => !task.done);
        case Filters.Pending:
            return state.tasks.filter(task => task.done);
        default:
            throw new Error('Option not valid.');
    }
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTask,
    changeTask,
    deleteCompleted,
    deleteTask,
    Filters,
    getCurrentFilter,
    getTasks,
    initState,
    setFilter,
};


 