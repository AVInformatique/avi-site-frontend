import { useNavigate } from 'react-router-dom'

import '/src/grid.css';
import './GuideHome.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';
import { Fragment } from 'react';

const GuideHome = () => {
    const textDescription = `L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon. Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.`
    const aviLink = "https://www.facebook.com/aviinsalyon"

    const navigate = useNavigate();
    const gotoPage = (path, posY = 0) => {
        navigate(path);
        const event = new Event('pathchange');
        window.dispatchEvent(event);
        window.scrollTo(0, posY)
    }

    return (
        <Fragment>
            <div className="guide-home section-overlap"></div>
            <div className="guide-home section grid wide">
                <div className="row head">
                    <div className="col l-12">
                        <h4 className="intro">First year at INSA?</h4>
                        <h2 className='title'>OUR GUIDANCE</h2>
                        <span className='intro-description'>{textDescription}</span>
                    </div>
                </div>

                <div className="buttons">
                    <ButtonComp
                        color = 'red'
                        size = 'large'
                        text = '-> Guide & Tutor'  
                        callback = {() => {gotoPage("/guide")} }  
                    ></ButtonComp>
                    <p className='text-middle'>OR</p>
                    <a href={aviLink} target='_blank'>
                        <ButtonComp
                            color = 'yellow'
                            size = 'large'
                            text = 'Contact Us'  
                        ></ButtonComp>
                    </a>  
                </div>

            </div>
        </Fragment>

    );
};

export default GuideHome;
