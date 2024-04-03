async function addTask() {
    const taskInput = document.getElementById('todo-task').value.trim();
    const descriptionInput = document.getElementById('todo-description').value.trim();

    if (!taskInput) {
        alert('Task name cannot be empty');
        return;
    }

    const response = await fetch('https://crudcrud.com/api/4538becaf8cb45338b7ccfb2c1078e4e/todolist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: taskInput, description: descriptionInput, done: false }),
    });

    if (!response.ok) {
        alert('Failed to add task.');
        return;
    }

    renderTasks();
    document.getElementById('todo-task').value = '';
    document.getElementById('todo-description').value = '';
}

async function deleteTask(id) {
    const response = await fetch(`https://crudcrud.com/api/4538becaf8cb45338b7ccfb2c1078e4e/todolist/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        alert('Failed to delete task.');
    }

    renderTasks();
}

async function updateTask(id, done) {
    const response = await fetch(`https://crudcrud.com/api/4538becaf8cb45338b7ccfb2c1078e4e/todolist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done }),
    });

    if (!response.ok) {
        alert('Failed to update task status.');
    }

    renderTasks();
}

async function renderTasks() {
    const response = await fetch('https://crudcrud.com/api/4538becaf8cb45338b7ccfb2c1078e4e/todolist');
    const todoList = await response.json();

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
            updateTask(item._id, this.checked);
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
            deleteTask(item._id);
        });
        taskDiv.appendChild(deleteButton);
    });
}
