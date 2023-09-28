import {createTaskHTML} from './create-task'

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Task} tasks 
 */
export const renderTasks = (elementId, tasks = []) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`Element ${elementId} not found.`);

    element.innerHTML = '';

    tasks.forEach(task => {
        element.append(createTaskHTML(task));
    });
}

