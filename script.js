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
        filterTasks(); // Atualiza a filtragem ao marcar/desmarcar
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede o evento de clique na tarefa
        editTask(li);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede o evento de clique na tarefa
        li.remove();
        saveTasks();
        filterTasks(); // Atualiza a filtragem ao remover
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
}

// Função para editar tarefa
function editTask(li) {
    const oldText = li.childNodes[0].textContent;
    const newText = prompt('Edite sua tarefa:', oldText);
    
    if (newText !== null && newText.trim() !== '') {
        li.childNodes[0].textContent = newText.trim();
        saveTasks();
        filterTasks(); // Atualiza a filtragem após edição
    }
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

// Função para filtrar tarefas
function filterTasks() {
    const filter = document.getElementById('filterSelect').value;
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');

        if (filter === 'all' || (filter === 'completed' && isCompleted) || (filter === 'pending' && !isCompleted)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Adicionar tarefa ao clicar no botão
document.getElementById('addButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        addTaskToDOM(taskText);
        taskInput.value = '';
        saveTasks();
        filterTasks(); // Atualiza a filtragem ao adicionar
    } else {
        alert('Por favor, adicione uma tarefa!');
    }
});

// Filtrar tarefas ao mudar o seletor
document.getElementById('filterSelect').addEventListener('change', filterTasks);

// Carregar tarefas ao iniciar
loadTasks();
