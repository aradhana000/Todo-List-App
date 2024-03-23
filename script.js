document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById('todo-task');
    const descriptionInput = document.getElementById('todo-description');
    const task = taskInput.value.trim();
    const description = descriptionInput.value.trim();

    if (task === '') {
        alert('Task name cannot be empty');
        return;
    }

    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.push({ task: task, description: description, done: false });
    localStorage.setItem('todoList', JSON.stringify(todoList));

    renderTasks();
    taskInput.value = '';
    descriptionInput.value = '';
}

function renderTasks() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const todoContainer = document.getElementById('todo-list');
    const doneContainer = document.getElementById('done-list');
    todoContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    todoList.forEach((item, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.addEventListener('change', function() {
            todoList[index].done = this.checked;
            localStorage.setItem('todoList', JSON.stringify(todoList));
            renderTasks();
        });
        const label = document.createElement('label');
        label.textContent = item.task + ' - ' + item.description;
        if (item.done) {
            label.style.textDecoration = 'line-through';
            doneContainer.appendChild(taskDiv);
        } else {
            todoContainer.appendChild(taskDiv);
        }
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            todoList.splice(index, 1);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            renderTasks();
        });
        taskDiv.appendChild(deleteButton);
    });
}