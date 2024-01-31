import { useState, useEffect } from 'react';

import '/src/grid.css';
import './ShowTreeEvents.css';

// Event handlers
import { getUpcomingEvents } from '/src/services/eventService.js';

// Components
import { ButtonComp } from '/src/components/General/buttonComp';
import { EventTree } from '../basics/eventTree'

// Icons
import { IoClose } from "react-icons/io5";

const ShowTreeEvents = () => {
    const [events, setEvents] = useState([]);
    async function fetchData(isRefresh = false) {
        try {
            const events = await getUpcomingEvents();
            setEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {fetchData()}, []);

    return (
        <div className="show-event-tree section grid wide">
            <div className="row head">
                <div className="col l-12">
                    <h4 className="intro">Don't miss out</h4>
                    <h2 className='title'>UPCOMING EVENTS</h2>
                </div>
            </div>

            <div className="row event-tree">
                <div className="col l-12">
                    <EventTree
                        events = {events}
                    ></EventTree>
                </div>
            </div>
        </div>
    );
};

export default ShowTreeEvents;
