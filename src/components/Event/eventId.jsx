import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventService';

// component for displaying events
import DetailEventId from './sections/DetailEventId'
import EventIdDescription from './sections/EventIdDescription'

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
            <DetailEventId event={event}></DetailEventId>
            <EventIdDescription event={event}></EventIdDescription> */
        </Fragment>
    );
};

export default EventId;
