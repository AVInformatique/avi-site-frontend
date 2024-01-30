import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import './EventIdDescription.css';

import { ButtonComp } from '/src/components/General/buttonComp';

const EventIdDescription = ({event}) => {
    function separateIntoParagraphs(text) {
        const paragraphs = text.split('\n');
        return paragraphs;
    }
    const eventAgenda = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor consequat id porta nibh venenatis cras. Turpis massa tincidunt dui ut ornare lectus sit. 
    - Eget nullam non nisi est sit amet. Lorem ipsum dolor sit amet. Consectetur purus ut faucibus pulvinar elementum. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. 
    - Ut pharetra sit amet aliquam id diam. Facilisis gravida neque convallis a cras. 
    Neque vitae tempus quam pellentesque nec nam aliquam sem et. Arcu risus quis varius quam quisque id diam vel quam. Quis imperdiet massa tincidunt nunc. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. `
    
    const paragraphs = separateIntoParagraphs(eventAgenda);
    
    return (
        <Fragment>
            <div className="description-event-id section grid wide">
                <div className="row">
                    <div className="details col l-12">
                        <h2 className="title">Event Agenda</h2>
                        {paragraphs.map( (parag, index) => 
                            <p key={index} className='parag'>{parag}</p>
                         )}
                        <div className="contact-us">
                            <span>Wanna know more?</span>
                            <ButtonComp
                                divClassName="button-inside"
                                color='yellow'
                                size='medium'
                                text="Contact us"
                                href={"https://www.facebook.com/aviinsalyon"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default EventIdDescription;
