import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import '/src/grid.css';
import './ShowTreeEvents.css';

// Event handlers
import { getUpcomingEvents } from '/src/services/eventService.js';

// Components
import { ButtonComp } from '/src/components/General/buttonComp';
import { EventTree } from '../basics/eventTree';

// Icons
import { IoClose } from "react-icons/io5";

const ShowTreeEvents = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!location.pathname.includes("/event")) {
            navigate("/event");
            const event = new Event('pathchange');
            window.dispatchEvent(event);
        }
        window.scrollTo(0, 1500);
    }

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
                        divClassName='event-tree-inside'
                    ></EventTree>
                </div>
                <ButtonComp
                    divClassName='button-comp-inside'
                    color = 'red'
                    text = 'And so on ...'
                    callback = {() => {handleButtonClick()}}
                ></ButtonComp>
            </div>
        </div>
    );
};

export default ShowTreeEvents;
