import React from 'react';
import { useState } from 'react';
import './buttonIcon.css';

export const ButtonIcon = ({ color = 'yellow', icon = '', 
                            divClassName='', callback = ()=>{}, isUsedSubmit = false }) => {
    const [state, dispatch] = useState('default')

    return (
        <button className={`button-icon ${color} ${state} ${divClassName}`}
            onMouseEnter={() => { dispatch('hover'); }}
            onMouseLeave={() => { dispatch('default'); }}
            onMouseDown={() => { dispatch('press');}}
            onMouseUp={() => { dispatch('hover');}}
            onClick = {callback}
            type = {isUsedSubmit ? 'submit' : 'button'}
        >
            <div className="overlap">
                {icon}
            </div> 
        </button>
    );
};
