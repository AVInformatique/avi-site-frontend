import React from 'react';
import { useState } from 'react';
import './buttonIcon.css';

export const ButtonIcon = ({ color = 'yellow', icon = '', divClassName='', callback = ()=>{} }) => {
    const [state, dispatch] = useState('default')

    return (
        <div className={`button-icon ${color} ${state} ${divClassName}`}
            onMouseEnter={() => { dispatch('hover'); }}
            onMouseLeave={() => { dispatch('default'); }}
            onMouseDown={() => { dispatch('press');}}
            onMouseUp={() => { dispatch('hover');}}
            onclick = {callback}
        >
            <div className="overlap">
                {icon}
            </div> 
        </div>
    );
};
