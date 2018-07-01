import { focus } from './index';

export const renderFocus = focus =>
{
    const incompleteFocus = focus.filter(focus => 
        {
            return !focus.completed;
        });

    document.querySelector('#focus-display').appendChild()
};