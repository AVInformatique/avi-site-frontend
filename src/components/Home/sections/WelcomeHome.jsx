import {useState} from 'react';

import '/src/grid.css';
import './WelcomeHome.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

const WelcomeHome = () => {
    const text = `L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon. Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.`

    const moreText = 
    `L'AVI organise des événements tout au long de l'année, comme des soirées, des sorties, des repas, des tournois sportifs, etc. Elle participe également à des événements organisés par d'autres associations.
    L'AVI est ouverte à tous les étudiants de l'INSA, vietnamiens ou non.
    `

    const [isShown, setIsShown] = useState(false);

    return (
        <div className="welcome-home section grid wide">
            <div className="row head">
                <div className="left-part col l-5">
                    <div className="text-part">
                        {/* <img className="logo-home" src={aviLogo} alt="AVI"/> */}
                        <h1 className="header">Association des Vietnamiens à l'INSA de Lyon</h1>

                        <p className="intro">{text}</p>    
                        { moreText.split('\n').map((parag, index) => {
                            return (<p key={index} 
                                className={`more intro ${isShown?'show':'hide'}`}>{parag}</p>)
                        })}
                    </div>
                    
                    <ButtonComp
                        divClassName={`button-welcome`}
                        text={`${isShown?'Show less':'Show more'}`}
                        callback = {() => {setIsShown(!isShown); window.scrollTo(0, 100);}}
                    ></ButtonComp>
                </div>

                <div className="off-set col l-1"></div>
                <div className="right-part col l-6">
                    <div className="img-home"></div>
                </div>
            </div>

        </div>
    );
};

export default WelcomeHome;
