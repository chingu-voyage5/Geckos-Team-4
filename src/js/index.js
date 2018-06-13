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

const input = document.querySelector('#todo_id');

const display_todo = item =>
{
    let html =
    `
        <ul class='list_container'>
            <li>${item}</li>
            <span class='list_delete'>X</span>
        </ul>
    `;

    document.querySelector('.todo_modal').insertAdjacentHTML('beforeend', html);
}

document.addEventListener('keypress', event =>
{
    if (event.keyCode === 13 || event.which === 13)
    {
        const todo_input = input.value;
        display_todo(todo_input);
    }
});