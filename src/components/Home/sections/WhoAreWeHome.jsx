import {Fragment, useState} from 'react';

import '/src/grid.css';
import './WhoAreWeHome.css';

//components
import { InfoTag } from '../basics/infoTag';
import { ButtonComp } from '/src/components/General/buttonComp';

//icons
import { FaPen } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";

//images
import { introduction_image } from '../../../images';

const WhoAreWeHome = () => {
    const textGeneral = `L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon. Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.`
    const textGoal = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

    const [isShown, setIsShown] = useState(false);

    return (
        <Fragment>
            <div className="who-are-we-home section-overlap"></div>
            <div className="who-are-we-home section grid wide">
                <div className="row ">
                    <div className="left-part col l-6">
                        <div className="left-text">
                            <p className="intro">Introduction</p>
                            <h2 className="title">WHO ARE WE?</h2>
                        </div>

                        <InfoTag
                            title = 'General'
                            color = 'yellow'
                            description = {textGeneral}
                            icon = {<FaPen />}
                        ></InfoTag>

                        <a href="https://www.facebook.com/aviinsalyon" target='_blank'>
                            <ButtonComp
                                size="large"
                                color = "red"
                                text="Contact us"
                                divClassName="button-left-part"
                            ></ButtonComp>
                        </a>
                    </div>

                    <div className="right-part col l-6">
                        <div className="img-tag">
                            <img src={introduction_image.src} alt="" />
                        </div>
                        <InfoTag
                            title = 'Goal'
                            color = 'red'
                            description = {textGoal}
                            icon = {<FaFlag />}
                        ></InfoTag>
                    </div>
                </div>

            </div>
        </Fragment>
    );

};

export default WhoAreWeHome;
