import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import { getUpcomingEvents } from '../../services/eventService';

import { EventBoxLarge } from './eventBoxLarge';

const WelcomeEvent = (event) => {

    return (
        <Fragment>
            <div className="row head">
                <div className="title l-5">
                    <h2>Events</h2>
                </div>
                <div className="search-bar l-7"></div>
            </div>

            <div className="row showEvent">
                <div className="title l-5">
                    <h2>Events</h2>
                </div>
                <div className="search-bar l-7"></div>
            </div>

            <EventBoxLarge event = {event}></EventBoxLarge>
        </Fragment>
    );
};

export default WelcomeEvent;
