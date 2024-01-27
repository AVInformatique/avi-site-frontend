import React from 'react';
import { useState } from 'react';
import './buttonComp.css';

export const ButtonComp = ({ stateParrent, size = 'large', color = 'yellow', text = 'Text', divClassName='' }) => {
    const [state, dispatch] = useState('default')

    return (
        <div className={`button ${size} ${color} ${stateParrent || state} ${divClassName}`}
            onMouseEnter={() => { dispatch('hover'); }}
            onMouseLeave={() => { dispatch('default'); }}
            onMouseDown={() => { dispatch('press');}}
            onMouseUp={() => { dispatch('hover');}}
        >
            <div className="overlap">
                <p className='text'>{text}</p>
            </div> 
        </div>
    );
};
