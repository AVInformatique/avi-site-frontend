import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import './WelcomeEvent.css';

import { getUpcomingEvents } from '/src/services/eventService';

import { EventBoxLarge } from '../eventBoxLarge';

const WelcomeEvent = ({event}) => {
    return (
        <div className="welcome-event section grid wide">
            <div className="row head">
                <div className="title col l-4">
                    <h2>Events</h2>
                </div>
                <div className="col l-8">
                    <div className="search-bar"></div>
                </div>
            </div>

            <EventBoxLarge event = {event}></EventBoxLarge>
        </div>
    );
};

export default WelcomeEvent;
