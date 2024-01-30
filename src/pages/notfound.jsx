import { Fragment } from 'react';
import './notfound.css';

const NotFound = () => {
    return (
        <Fragment>
            <div className="not-found overlap">
                <img className='img' src="/src/assets/not-found.jpg" alt="NotFound" />
            </div>
        </Fragment>
    );
}

export default NotFound;