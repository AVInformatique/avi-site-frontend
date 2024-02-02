import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventService';

// component for displaying events
import GuideIntro from './sections/GuideIntro'
import GuideTutorPart from './sections/GuideTutorPart'

const Guide = () => {
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
            <GuideIntro></GuideIntro>
            <GuideTutorPart></GuideTutorPart> 
        </Fragment>
    );
};

export default Guide;
