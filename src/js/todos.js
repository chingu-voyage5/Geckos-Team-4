import { todos } from './index';

const removeTodo = id => 
{
    const todoIndex = todos.findIndex(todo => 
    {
        return todo.id === id;
    });

    if (todoIndex > -1) 
    {
        todos.splice(todoIndex, 1);
    }
}

const toggleTodo = id => 
{
    const todo = todos.find(todo => 
    {
        return todo.id === id;
    });

    if (todo !== undefined) 
    {
        todo.completed = !todo.completed;
    }
}

export const renderTodos = todos => 
{
    const incompleteTodos = todos.filter(todo => 
    {
        return !todo.completed;
    });

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

    todos.forEach(todo =>
    {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
};

const generateTodoDOM = todo =>
{
    const todoEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;

    if (checkbox.checked)
    {
        todoText.classList.toggle('completed');
    }

    todoEl.appendChild(checkbox);

    checkbox.addEventListener('change', () => 
    {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos);
    });

    todoText.textContent = todo.text;
    todoEl.appendChild(todoText);
    
    removeButton.textContent = 'x';
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => 
    {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos);
    });

    return todoEl;
};

const generateSummaryDOM = incompleteTodos => 
{
    const summary = document.createElement('h2');
    summary.textContent = `${incompleteTodos.length} TO DO`;
    return summary;
};

export const loadTodos = () =>
{
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) 
    {
        return JSON.parse(todosJSON);
    } 
    else 
    {
        return [];
    }
};

export const saveTodos = todos =>
{
    localStorage.setItem('todos', JSON.stringify(todos));
};