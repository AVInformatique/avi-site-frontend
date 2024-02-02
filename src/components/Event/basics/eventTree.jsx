import { useState, Fragment } from 'react';

import './eventTree.css';

//components
import { EventItemTimeline } from './eventItemTimeline';

export const EventTree = ({ events = [{}], divClassName='' }) => {
    
    return (
        <div className={`event-tree ${divClassName}`}>
            <div className="middle-line"></div>
            {events.map((event, index) => {
                const date = event.date ? event.date.toDate() : new Date("1/1/2003");
                return (
                    <div className={`tree-element ${index % 2 ? 'right' : 'left'}`}
                        key = {index}>
                        <EventItemTimeline
                            event = {event}
                            direction = {index % 2 ? 'right' : 'left'}
                            divClassName = 'item-timeline'
                        ></EventItemTimeline>

                        <div className="tree-node">
                            <div className="tree-node-inside"></div>
                        </div>

                        <p className="event-date">{date.toLocaleDateString()}</p>
                    </div>
                )
            })}
        </div>
    );
};
