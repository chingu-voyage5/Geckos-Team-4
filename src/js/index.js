require('../styles/app.css')


function toggle()
{
    if (modal.style.display == 'flex')
    {
        modal.style.display = 'none';
    }
    else
    {
        modal.style.display = 'flex';
    }
};

const modal = document.querySelector('.todo_modal');
document.querySelector('.todo__container').addEventListener('click', toggle);

let todo_array = [];
const input = document.querySelector('#todo_id');

const addItem = () =>
{
    todo_array.push(input.value);
}

const display_todo = (item) =>
{
    let html =
    `
        <div>${item}</div>
    `;

    document.querySelector('.todo_modal').insertAdjacentHTML('beforeend', html);
}

document.addEventListener('keypress', event =>
{
    if (event.keyCode === 13 || event.which === 13)
    {
        addItem();
        display_todo(todo_array);
    }
});