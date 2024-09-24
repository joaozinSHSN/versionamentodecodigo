// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Função para adicionar tarefa ao DOM
function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) {
        li.classList.add('completed');
    }

    // Marcar como concluído
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede o evento de clique na tarefa
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const taskItems = document.querySelectorAll('#taskList li');
    const tasks = [];
    taskItems.forEach(item => {
        tasks.push({
            text: item.childNodes[0].textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adicionar tarefa ao clicar no botão
document.getElementById('addButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        addTaskToDOM(taskText);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Por favor, adicione uma tarefa!');
    }
});

// Carregar tarefas ao iniciar
loadTasks();
