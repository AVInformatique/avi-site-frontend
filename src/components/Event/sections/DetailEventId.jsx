import { Fragment } from 'react';

import '/src/grid.css';
import './DetailEventId.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

//icons
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

//images
import { event_default_image } from "/src/images"

const DetailEventId = ({event}) => {
    const date = event.date ? event.date.toDate() : new Date("1/1/2003");
    return (
        <Fragment>
            <div className="overlay-decoration"></div>
            <div className="detail-event-id section grid wide">
                <div className="row">
                    <div className="details col l-7">
                        <h2 className='name'>{event.name}</h2>
                        <div className="detail-box">
                            <h3 className="title">Event Info</h3>
                            <span className='small-description'>{`${event.name} takes time and takes places at:`}</span>
                            <div className="list-with-icon time">
                                <IoIosTime />
                                <span>{date.toLocaleString()}</span>
                            </div>
                            <div className="list-with-icon location">
                                <FaLocationDot />
                                <span>{event.location || "INSA Lyon, Villeurbanne"}</span>
                            </div>

                            <ButtonComp
                                divClassName="button-inside"
                                color='red'
                                size='large'
                                text="Register to event"
                                href={event.href || "https://www.facebook.com/aviinsalyon"}
                            />
                        </div>
                    </div>
                    <div className="col col l-1"></div>
                    <div className="img col l-4">
                        <img className="event-img" src={event.img || event_default_image.src}/>
                    </div>
                </div>
            </div>
            

        </Fragment>

    );
};

export default DetailEventId;
