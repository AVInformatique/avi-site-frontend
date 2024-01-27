import React from 'react';
import { useState } from 'react';
import { ButtonComp } from '/src/components/General/buttonComp';
import './eventBoxLarge.css';

export const EventBoxLarge = ({ event }) => {
    const [state, dispatch] = useState('default');
    const date = event.date ? event.date.toDate() : new Date("1/1/2003");

    return (
        <div className={`event-box-large ${state}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('default'); }}
             onMouseDown={() => {dispatch('press');}}
             onMouseUp={() => {dispatch('hover');}}
        >
            <div className="left-part">
                <div className="event-img"> </div>
                <div className="date-month">
                    <span className="day">DD</span>
                    <span className="mon">MON</span>
                </div>
            </div>
            <div className="right-part">
                <div className="info">
                    <p className="date">{date.toUTCString()}</p>
                    <p className="name">{event.name}</p>
                    <p className="description">{event.description}</p>
                </div>

                <ButtonComp
                    divClassName="button-inside"
                    color='yellow'
                    size='large'
                    text="Learn more"
                    stateParrent = {state}
                />
            </div>
        </div>
    );
};
