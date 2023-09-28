import appStore from '../../store/task.store'

let element;

/**
 * 
 * @param {String} elementId 
 */
export const renderPending = (elementId) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error('Element Id not found');
    
    element.innerHTML = appStore.getTasks(appStore.Filters.Pending).length;
}


