import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom'
import '/src/grid.css';
import './WelcomeEvent.css';

import { getUpcomingEvents } from '/src/services/eventService';

import { EventBoxLarge } from '../eventBoxLarge';
import { SearchBox } from '/src/components/General/searchBox'

const WelcomeEvent = ({event}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className="welcome-event section grid wide">
            <div className="row head">
                <div className="title col l-4">
                    <h2>Events</h2>
                </div>
                <div className="col l-8">
                    <SearchBox
                        usedAsFrom = {true}
                        text = {searchParams.get('search') || 'Looking for some events?'}
                    ></SearchBox>
                </div>
            </div>

            <EventBoxLarge event = {event}></EventBoxLarge>
        </div>
    );
};

export default WelcomeEvent;
