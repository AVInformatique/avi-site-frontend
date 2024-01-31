import { useState, Fragment } from 'react';

import './eventTree.css';

//components
import { EventItemTimeline } from './eventItemTimeline';

export const EventTree = ({ events = [{}], divClassName='' }) => {
    
    return (
        <div className={`event-tree ${divClassName}`}>
            {events.map((event, index) => {
                return (
                    <EventItemTimeline
                        key = {index}
                        event = {event}
                        direction = {index % 2 ? 'right' : 'left'}
                        divClassName = 'item-timeline'
                    ></EventItemTimeline>
                )
            })}
            <div className="middle-line"></div>
        </div>
    );
};
