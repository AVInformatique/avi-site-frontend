import { useState } from 'react';
import './buttonComp.css';
import PropTypes from "prop-types";

export const ButtonComp = ({ stateParrent, callback = () => {}, isUsedSubmit = false, href = '',
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
            href = {href}
        >
            {href === '' ?
                (<div className="overlap">
                    <p className='text'>{text}</p>
                </div>)
            :   (<a className="overlap" href={href} target="_blank">
                    <p className='text'>{text}</p>
                </a>) 
            } 
        </button>
    );
};

ButtonComp.propTypes = {
    stateParrent: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    divClassName: PropTypes.string,
};
