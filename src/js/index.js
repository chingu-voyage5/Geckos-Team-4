require('../styles/app.css')
import uuidv4 from 'uuid/v4';
import { getLocation } from './weather';
import { renderTodos, saveTodos, loadTodos } from './todos';
import { renderFocus, loadFocus, renderDifferentFocus } from './focus';
//sara:comment out following line
// import * as setTime from './clock';

import { setTime } from './clock';
import { randomizeQuote } from './quote';
import { particlesFunction } from './particles';
// import { changeBackground } from './background';
import { addListeners } from './background';

document.onload = getLocation();  //weather widget
//sara:comment out following line
// console.log(`I imported ${num} from another module!! ${clock}` );
//sara:added following line
setInterval(setTime, 1000);


// search widget
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener("keypress",function(event) {
    let query = `https://www.google.com/search?q=${searchInput.value}`;
    query = query.replace(/ /g, "%20");
    if (event.keyCode === 13 || event.which ===13){
        window.open(query, '_blank');
        searchInput.value = ``;
    }
});


addListeners();
randomizeQuote();
// particlesFunction();
// changeBackground();

/**----------------------------------------------------------- TODOS ------------------------------------------------------- **/
export let todos = loadTodos();
export let focus = loadFocus();
renderTodos(todos);

document.querySelector('#new-todo').addEventListener('keypress', function (e)
{
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
    if (!focus[0])
    {
        renderFocus(focus);
    }
    else
    {
        renderDifferentFocus();
    }
/**----------------------------------------------------------- /FOCUS ------------------------------------------------------- **/