export const createTaskHTML = (tasks) => {
    if (!tasks) throw new Error('Tasks is required');
    const {id, title, done, date} = tasks;

    const html = `
    <div class="list-item">
        <div class="list-texts">
            <h3 class="list-task-title">${title}</h3>
            <p class="task-text">${date}</p>
        </div>
        <div class="list-info">
            <p class="${done ? 'status-pending' : 'status-completed'}">${done ? 'Pending' : 'Completed'}</p>
        </div>
        <div class="list-icon">
            <img class="btn-delete" src="../../../public/delete.png" alt="delete">
        </div>
        </div>
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if (done) liElement.classList.add('completed');

    return liElement;
}


