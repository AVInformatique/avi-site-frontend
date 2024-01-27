import { useState, useEffect, Fragment } from 'react';
import { getEvents, getUpcomingEvents } from '../../services/eventService';

// component for displaying events
import WelcomeEvent from './sections/WelcomeEvent'
import ShowEvent from './sections/ShowEvent'

const Events = () => {
    const [UpcomingEvents, setUpcomingEvents] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await getEvents();
                setUpcomingEvents(events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchData();
        console.log(UpcomingEvents);
    }, []);
    console.log(UpcomingEvents);

    return (
        <Fragment>
            <WelcomeEvent event={UpcomingEvents[0]}></WelcomeEvent>
            <ShowEvent></ShowEvent>
        </Fragment>
    );
};

export default Events;
