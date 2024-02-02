import '/src/grid.css';
import './footer.css';

//components
import { Fragment } from 'react';

const Footer = () => {
    const textDescription = `L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon. Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.`
    const aviLink = "www.facebook.com/aviinsalyon"
    const aviTel = "0123456789"
    const aviTelPrefix = "(+33) 01 23 45 67 89"
    const aviEmail = "avi.resp@asso-insa-lyon.fr"

    return (
        <Fragment>
            <div className="footer overlap"></div>
            <div className="footer content grid wide">
                <div className="logo-avi"></div>
                <div className="row">
                    <div className="left-part col l-6">
                        <h4 className="name">Associations des vietnamiens à INSA Lyon</h4>
                        <p className='description'>{textDescription}</p>
                        <address>
                            <p className='contact email'   >Email:          <a href = {`mailto:${aviEmail}`}>{aviEmail}</a></p>
                            <p className='contact facebook'>Facebook:       <a href = {`https://${aviLink}`} target='_blank'>{aviLink}</a></p>
                            <p className='contact tel'     >Contact number: <a href = {`tel:${aviTel}`}>{aviTelPrefix}</a></p>
                        </address>
                    </div>
                    <div className="off-set col l-4"></div>
                    <div className="right-part col l-2">
                        <h4 className="title">NAVIGATION</h4>
                        <a className='nav-footer home' href="/">Home</a>
                        <a className='nav-footer alumni' href="/alumni">Alumnis</a>
                        <a className='nav-footer event' href="/event">Events</a>
                        <a className='nav-footer guide' href="/guide">Guide & Tutor</a>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default Footer;
