import { focus } from './index';
import uuidv4 from 'uuid/v4';

const clearFocusDom = () =>
{
    document.querySelector('#focus-container').innerHTML = '';
};

export const renderDifferentFocus = () =>
{
    document.querySelector('#focus-container').appendChild(differentFocusDom(focus));
};

const toggleFocus = id => 
{
    const el = focus.find(focus => 
    {
        return focus.id === id;
    });

    if (el !== undefined) 
    {
        focus.completed = !focus.completed;
    }
}

const removeFocus = id => 
{
    const focusIndex = focus.findIndex(el => 
    {
        return el.id === id;
    });

    if (focusIndex > -1) 
    {
        focus.splice(focusIndex, 1);
    }
}

const differentFocusDom = focus =>
{
    const differentFocusEl = document.createElement('div');
    const today = document.createElement('h1');
    today.textContent = "TODAY";
    const checkbox = document.createElement('input');
    const differentFocusText = document.createElement('span');
    const removeButton = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = focus.completed;

    if (checkbox.checked) 
    {
        differentFocusText.classList.toggle('completed');
    }

    differentFocusEl.appendChild(today);
    differentFocusEl.appendChild(checkbox);

    checkbox.addEventListener('change', () => 
    {
        toggleFocus(focus[0].id);
        saveFocus(focus);
        clearFocusDom();
        renderDifferentFocus();
    }); 

    differentFocusText.textContent = focus[0].text;
    differentFocusEl.appendChild(differentFocusText);

    removeButton.textContent = 'x';
    differentFocusEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => 
    {
        removeFocus(focus[0].id);
        saveFocus(focus);
        clearFocusDom();
        renderFocus(focus);
    });

    return differentFocusEl;

};

export const renderFocus = focus =>
{
    const focusDisplay = document.createElement('h3');
    focusDisplay.textContent = 'What is your main focus for today?';
    const focusInput = document.createElement('input');
    focusInput.classList.add('focusText');
    focusInput.classList.add('input');

    document.querySelector('#focus-container').appendChild(focusDisplay);
    document.querySelector('#focus-container').appendChild(focusInput);

    focusInput.addEventListener('keypress', function (e) 
    {
        if (e.keyCode === 13 || e.which === 13) 
        {
            if (e.target.value != '') 
            {
                focus.push({
                    id: uuidv4(),
                    text: e.target.value,
                    completed: false
                });
                clearFocusDom();
                saveFocus(focus);
                renderDifferentFocus();
            }
        }
    });
};

export const loadFocus = () => 
{
    const focusJSON = localStorage.getItem('focus');

    if (focusJSON !== null) 
    {
        return JSON.parse(focusJSON);
    }
    else 
    {
        return [];
    }
};

export const saveFocus = focus => 
{
    localStorage.setItem('focus', JSON.stringify(focus));
};