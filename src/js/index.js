require('../styles/app.css')
import uuidv4 from 'uuid/v4';
import { getLocation } from './weather';
import { renderTodos, saveTodos, loadTodos } from './todos';
import { renderFocus, loadFocus, renderDifferentFocus } from './focus';
//sara:comment out following line
// import * as setTime from './clock';

import { setTime } from './clock';
import { randomizeQuote } from './quote';
//import { particlesFunction } from './particles';
import 'particles.js/particles';
const particlesJS = window.particlesJS;
// import { changeBackground } from './background';
//import { addListeners } from './background';

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


// addListeners();
randomizeQuote();

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

/**----------------------------------------------------------- PARTICLES JS ------------------------------------------------------- **/
particlesJS('particles-js',{
    "particles":{
      "number":{
        "value":400
      },
      "color":{
        "value":"#2FFEB0"
      },
      "shape":{
        "type":"circle",
        "stroke":{
          "width":1,
          "color":"#ccc"
        },
        "image":{
          "src":"http://www.iconsdb.com/icons/preview/white/contacts-xxl.png"
        }
      },
      "opacity":{
        "value":0.9,
        "random":true,
        "anim":{
          "enable":false,
          "speed":1
        }
      },
      "size":{
        "value": 5,
        "random":false,
        "anim":{
          "enable": false,
          "speed":50
        }
      },
      "line_linked":{
        "enable": true,
        "distance": 120,
        "color":"#fff",
        "width":1
      },
      "move":{
        "enable":true,
        "speed":2,
        "direction":"none",
        "straight":false
      }
    },
    "interactivity":{
      "events":{
        "onhover":{
          "enable":true,
          "mode":"repulse"
        },
        "onclick":{
          "enable": true,
          "mode":"push"
        }
      },
      "modes":{
        "repulse":{
          "distance":50,
          "duration":0.4
        },
        "bubble":{
          "distance":100,
          "size":10
        }
      }
    }
  }
)
/**----------------------------------------------------------- /PARTICLES JS ------------------------------------------------------- **/

/**----------------------------------------------------------- TODO MODAL ------------------------------------------------------- **/
document.querySelector('.todo_button').addEventListener('click', function()
{
  const todo_modal = document.querySelector('.todo_modal');
  if (todo_modal.style.display === 'none')
  {
    todo_modal.style.display = 'grid';
  }
  else
  {
    todo_modal.style.display = 'none';
  }
});
/**----------------------------------------------------------- /TODO MODAL ------------------------------------------------------- **/