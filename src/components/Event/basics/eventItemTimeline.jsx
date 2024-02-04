import { useState } from 'react';

import './eventItemTimeline.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

//images
import { event_default_image } from "/src/images"

export const EventItemTimeline = ({ event = {}, direction = 'right', divClassName = '' }) => {
    const [state, dispatch] = useState('default');

    return (
        <a className={`event-item-timeline ${state} ${direction} ${divClassName}`}
             href={`/event/${event.id}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('default'); }}
             onMouseDown={() => {dispatch('press');}}
             onMouseUp={() => {dispatch('hover');}}
        >
            <div className="overlap">
                <div className="img-part">
                        <img className="event-img" src = {event.img || event_default_image.src}/>
                </div>

                <div className="details-part">
                    <p className="name">{event.name}</p>
                    <p className="description">{event.description}</p>
                </div>
            </div>
            <div className="triangle"></div>
        </a>
    );
};
