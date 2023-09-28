import html from './app.html?raw'
import appStore from '../store/task.store'
import {renderPending} from './use-cases/render-pending'
import {renderTasks} from './use-cases/render-tasks'

const elementIds = {
    NewTodoInput: '#new-todo-input',
    ButtonNewInput: '#btn-add',
    RendingCount: '#pending-count',
    TodoFilters: '.filtro',
    TodoList: '.todo-list',
    ClearCompleted: '#clear-completed',
}

export const App = (elementId) => {
    const displayTasks = () => {
        const tasks = appStore.getTasks(appStore.getCurrentFilter());
        renderTasks(elementIds.TodoList, tasks);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIds.RendingCount);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;

        document.querySelector(elementId).append(app);
        displayTasks();
    })();

    // html references
    const newTaskInput = document.querySelector(elementIds.NewTodoInput);
    const taskListUL = document.querySelector(elementIds.TodoList);
    const clearCompletedButton = document.querySelector(elementIds.ClearCompleted);
    const filtersUL = document.querySelectorAll(elementIds.TodoFilters);

    newTaskInput.addEventListener('keyup', event => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;
        
        appStore.addTask(event.target.value);
        displayTasks();
        event.target.value = '';
    });

    taskListUL.addEventListener('click', event => {
        const element = event.target.closest('[data-id]');
        appStore.changeTask(element.getAttribute('data-id'));
        displayTasks();
    });

    taskListUL.addEventListener('click', event => {
        const isDelete = event.target.className === 'btn-delete';
        const element = event.target.closest('[data-id]');
        if (!element || !isDelete) return;

        appStore.deleteTask(element.getAttribute('data-id'));
        displayTasks();
    });

    clearCompletedButton.addEventListener('click', () => {
        appStore.deleteCompleted();
        displayTasks();
    });

    filtersUL.forEach(element => {
        element.addEventListener('click', ele => {
            switch (ele.target.text) {
                case 'All':
                    appStore.setFilter(appStore.Filters.All);
                    break;
                case 'Pending':
                    appStore.setFilter(appStore.Filters.Pending);
                    break;
                case 'Completed':
                    appStore.setFilter(appStore.Filters.Completed);
                    break;
            }
            displayTasks();
        });
    });

}


