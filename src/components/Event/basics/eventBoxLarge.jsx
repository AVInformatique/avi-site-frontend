import { useState } from 'react';

import './eventBoxLarge.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

export const EventBoxLarge = ({ event }) => {
    const [state, dispatch] = useState('default');
    const date = event.date ? event.date.toDate() : new Date("1/1/2003");
    const monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"]

    return (
        <a className={`event-box-large ${state}`}
            href={`/event/${event.id}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('default'); }}
             onMouseDown={() => {dispatch('press');}}
             onMouseUp={() => {dispatch('hover');}}
        >
            <div className="left-part">
                {event.img ? 
                    <img className="event-img" src={event.img}/>
                    : <div className="event-img"></div> 
                }
                <div className="date-month">
                    <span className="day">{`${(date.getDate() < 10) ? '0' : ''}${date.getDate()}`}</span>
                    <span className="mon">{monthString[date.getMonth()]}</span>
                </div>
            </div>
            <div className="right-part">
                <div className="info">
                    <p className="date">{date.toLocaleString()}</p>
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
        </a>
    );
};
