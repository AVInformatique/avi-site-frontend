import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import { getUpcomingEvents } from '../../services/eventService';

// component for displaying events
import {WelcomeEvent} from './WelcomeEvent'

const Events = () => {
    const [UpcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await getUpcomingEvents();
                setUpcomingEvents(events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container grid wide">
            Hello
            <WelcomeEvent event={UpcomingEvents[0]}></WelcomeEvent>
        </div>
    );
};

export default Events;
