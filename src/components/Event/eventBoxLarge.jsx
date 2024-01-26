import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { buttonLargeYellow } from '/src/components/General/buttonLargeYellow';
import './eventBoxLarge.css';

export const EventBoxLarge = ({ event }) => {
    const [state, dispatch] = useState('default');

    return (
        <div className={`event-box-large ${state}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('press'); }}
        >
                    <div className="overlap-group-2">
                        <div className="IMAGE-OF-EVENTS"> X </div>
                    </div>
                    <div className="DD-MON-wrapper">
                        <p className="DD-MON">
                            <span className="span">
                                DD
                                <br />
                            </span>
                            <span className="text-wrapper-5">
                                MON
                            </span>
                        </p>
                    </div>
                    <div className="overlap">
                        <p className="name">{event.name}</p>
                        <p className="date">{event.date}</p>
                    </div>
                    <div className="overlap-group">
                        <p className="description">{event.description}</p>
                        <buttonLargeYellow
                            className="instance-node"
                            divClassName="button-large-yellow"
                            overlapGroupClassName="button-large-yellow-instance"
                            property1="hover"
                            text="Learn more"
                        />
                    </div>
            </div>
    );
};
