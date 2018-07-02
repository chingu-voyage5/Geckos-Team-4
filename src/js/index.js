require('../styles/app.css')
import uuidv4 from 'uuid/v4';
import { getLocation } from './weather';
import { renderTodos, saveTodos, loadTodos } from './todos';
import { renderFocus, loadFocus } from './focus';
//sara:comment out following line
// import * as setTime from './clock';

import { setTime } from './clock';

document.onload = getLocation();  //weather widget
//sara:comment out following line
// console.log(`I imported ${num} from another module!! ${clock}` );
//sara:added following line
setInterval(setTime, 1000);

/**----------------------------------------------------------- TODOS ------------------------------------------------------- **/
export let todos = loadTodos();
export let focus = [];
renderTodos(todos);

document.querySelector('#new-todo').addEventListener('keypress', function (e) {
    // e.preventDefault()

    if (e.keyCode === 13 || e.which ===13)
    {
        if (e.target.value != '')
        {
            todos.push({
                id: uuidv4(),
                text: e.target.value,
                completed: false
            });
            saveTodos(todos);
            renderTodos(todos);
        }

        e.target.value = '';
    }
});

/**----------------------------------------------------------- /TODOS ------------------------------------------------------- **/

/**----------------------------------------------------------- FOCUS ------------------------------------------------------- **/
    document.querySelector('#focus-container').addEventListener('load', renderFocus(focus));
/**----------------------------------------------------------- /FOCUS ------------------------------------------------------- **/