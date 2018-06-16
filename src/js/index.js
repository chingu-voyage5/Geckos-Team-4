require('../styles/app.css')
import num from './test';
//sara:comment out following line
// import * as setTime from './clock';

import { setTime } from './clock';

//sara:comment out following line
// console.log(`I imported ${num} from another module!! ${clock}` );
//sara:added following line
setInterval(setTime, 1000);




import _ from './weather';


console.log(`I imported ${num} from another module!!`);

function get_todos() {
    let todos = new Array;
    let todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function add() {
    var task = document.getElementById('task').value;

    var todos = get_todos();

    if (task != '')
    {
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));
    }

    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function show() {
    var todos = get_todos();

    var html = '<ul>';
    for (var i = 0; i < todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i + '">x</button></li>';
    };
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

document.getElementById('task').addEventListener('keypress', e =>
{
    if (e.keyCode === 13 || e.which === 13)
    {
        add();
        document.getElementById('task').value = '';
    }
});
show();