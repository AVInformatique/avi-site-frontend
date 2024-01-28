import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventService';

// component for displaying events
import WelcomeEvent from './sections/WelcomeEvent'
import ShowEvent from './sections/ShowEvent'

const EventId = () => {
    const { id } = useParams();
    const [event, setEvent] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const e = await getEventById(id);
                setEvent(e);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <WelcomeEvent event={event}></WelcomeEvent>
            <ShowEvent></ShowEvent>
        </Fragment>
    );
};

export default EventId;
