import React from 'react';
import { useState } from 'react';
import './buttonComp.css';

export const ButtonComp = ({ stateParrent, callback = () => {}, isUsedSubmit = false,
                            size = 'large', color = 'yellow', text = 'Text', divClassName='' }) => {
    const [state, dispatch] = useState('default')

    return (
        <button className={`button ${size} ${color} ${stateParrent || state} ${divClassName}`}
            onMouseEnter={() => { dispatch('hover'); }}
            onMouseLeave={() => { dispatch('default'); }}
            onMouseDown={() => { dispatch('press');}}
            onMouseUp={() => { dispatch('hover');}}
            onClick = {callback}
            type = {isUsedSubmit ? 'submit' : 'button'}
        >
            <div className="overlap">
                <p className='text'>{text}</p>
            </div> 
        </button>
    );
};
