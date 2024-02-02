import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom'
import '/src/grid.css';
import './GuideIntro.css';

import { ButtonComp } from '/src/components/General/buttonComp';

const GuideIntro = () => {
    const description = `Vietnamese students who are visiting France for the first time, as well as those who are attending INSA Lyon. The guide covers a wide range of topics, including accommodation, transportation, and cultural differences. I hope you find it helpful! 😊`;
    const image = '';
    const guideLink = "https://drive.google.com/file/d/12Ev0oIjmo3ObI8-vwaWyCJvpP7peqTsR/view?usp=sharing"
    return (
        <Fragment>
            <div className="overlay-decoration"></div>
            <div className="guide-intro section grid wide">
                <div className="row">
                    <div className="details col l-7">
                        <h2 className='name'>Guide & Tutor</h2>
                        <div className="detail-box">
                            <h3 className="title">AVI GUIDE</h3>
                            <p className='small-description'>{description}</p>
                            
                            <a href={guideLink} target="_blank">
                                <ButtonComp
                                    divClassName="button-inside"
                                    color='red'
                                    size='large'
                                    text="Guide file"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col col l-1"></div>
                    <div className="img col l-4">
                        {image && (
                            <img src={image}></img>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default GuideIntro;
