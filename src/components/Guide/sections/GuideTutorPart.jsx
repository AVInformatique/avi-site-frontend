import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import './GuideTutorPart.css';

import { ButtonComp } from '/src/components/General/buttonComp';

const GuideTutorPart = ({event}) => {
    function separateIntoParagraphs(text) {
        const paragraphs = text.split('\n');
        return paragraphs;
    }
    const eventAgenda = `
    We're a bunch of Vietnamese students just like you, studying at INSA Lyon. We've been through the ups and downs of student life and we're here to lend a hand!
    We know that settling into a new place can be a bit tough. Whether it's a tricky module you're grappling with, or you're just looking for some tips on making the most of life at INSA Lyon, we've got your back.
    So, if you're in need of a tutor or some advices, or just a friendly chat, give us a shout! We're all in this together, and we're excited to make our journey at INSA Lyon a memorable one with you! `
    
    const paragraphs = separateIntoParagraphs(eventAgenda);
    
    return (
        <Fragment>
            <div className="guide-tutor-part section grid wide">
                <div className="row">
                    <div className="details col l-12">
                        <h2 className="title">Hey buddy, Need Some Advice or Tutoring?</h2>
                        {paragraphs.map( (parag, index) => 
                            <p key={index} className='parag'>{parag}</p>
                         )}
                        <div className="contact-us">
                            <span>Break the ice and</span>
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

export default GuideTutorPart;
