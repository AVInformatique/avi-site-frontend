import { useState } from 'react';

import './eventBoxMedium.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

export const EventBoxMedium = ({ event = {}, divClassName }) => {
    const [state, dispatch] = useState('default');
    const date = event.date ? event.date.toDate() : new Date("1/1/2003");
    const monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"]

    return (
        <a className={`event-box-medium ${state} ${divClassName}`}
            href={`/event/${event.id}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('default'); }}
             onMouseDown={() => {dispatch('press');}}
             onMouseUp={() => {dispatch('hover');}}
        >
            <div className="up-part">
                {event.img ? 
                    <img className="event-img" src={event.img}/>
                    : <div className="event-img"></div> 
                }
                <div className="date-month">
                    <span className="day">{`${(date.getDate() < 10) ? '0' : ''}${date.getDate()}`}</span>
                    <span className="mon">{monthString[date.getMonth()]}</span>
                </div>
            </div>
            <div className="down-part">
                <div className="info">
                    <p className="date">{date.toLocaleString()}</p>
                    <p className="name">{event.name}</p>
                    <p className="description">{event.description}</p>
                </div>

                <ButtonComp
                    divClassName="button-inside"
                    color='yellow'
                    size='small'
                    text="Learn more"
                    stateParrent = {state}
                />
            </div>
        </a>
    );
};
