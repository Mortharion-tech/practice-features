document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');

    addTaskButton.addEventListener('click', addTask);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = input.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
            input.value = '';
        }
    }
});