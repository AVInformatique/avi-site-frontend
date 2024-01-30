import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom'
import '/src/grid.css';
import './DetailEventId.css';

const DetailEventId = ({event}) => {

    return (
        <Fragment>
            <div className="overlay-decoration"></div>
            <div className="detail-event-id section grid wide">
                <div className="row">
                    <div className="details col l-7">
                        <h2 className='name'>event.name</h2>
                        <div className="detail-box">
                            <h3 className="title">Event Info</h3>
                            <span>{`${event.name} takes time and take places at:`}</span>
                            <div className="list-with-icon time">
                                {/* icon */}
                                <span>{event.date.toLocaleString()}</span>
                            </div>
                            <div className="list-with-icon location">
                                {/* icon */}
                                <span>{event.location || "INSA Lyon, Villeurbanne"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col l-o-1"></div>
                    <div className="img col l-4"></div>
                </div>
            </div>
        </Fragment>

    );
};

export default DetailEventId;
