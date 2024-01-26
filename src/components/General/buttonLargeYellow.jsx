import PropTypes from 'prop-types';
import React from 'react';
import { useReducer } from 'react';
import './buttonLargeYellow.css';

export const ButtonLargeRed = ({ property1, divClassName, text = 'Text' }) => {
    const [state, dispatch] = useReducer(reducer, {
        property1: property1 || 'default',
    });

    return (
        <div className={`button-large-yellow ${state.property1}`}
             onMouseEnter={() => {dispatch('mouse_enter');}}
             onMouseLeave={() => {dispatch('mouse_leave');}}
        >
            <div className="overlap-group">
                {['default', 'press'].includes(state.property1) && (
                    <div className={`text ${divClassName}`}>{text}</div>
                )}

                {state.property1 === 'hover' && <>{text}</>}
            </div>
        </div>
    );
};

function reducer(state, action) {
    switch (action) {
        case 'mouse_enter':
            return {
                ...state,
                property1: 'hover',
            };

        case 'mouse_leave':
            return {
                ...state,
                property1: 'default',
            };
    }

    return state;
}

ButtonLargeRed.propTypes = {
    property1: PropTypes.oneOf(['hover', 'press', 'default']),
    text: PropTypes.string,
};
