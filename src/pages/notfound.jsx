import { Fragment } from 'react';
import './notfound.css';
import { not_found_img } from "/src/images.jsx";

const NotFound = () => {
    return (
        <Fragment>
            <div className="not-found overlap">
                <img className='img' src={not_found_img.src} alt="NotFound" />
            </div>
        </Fragment>
    );
}

export default NotFound;