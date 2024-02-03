import { useNavigate } from 'react-router-dom'

import '/src/grid.css';
import './ShowAlumnisAlbumsHome.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';
import { AlbumPromo } from '../basics/albumPromo'
import { Fragment } from 'react';

const ShowAlumnisAlbumsHome = () => {
    const textDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    const aviLink = "https://www.facebook.com/aviinsalyon"
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const yearDebut = currentMonth < 9 ? currentYear - 1 : currentYear;
    const nbPromoShow = 3;
    const yearArray = Array.from({ length: nbPromoShow }, (_, index) => (yearDebut - nbPromoShow + 1 + index));
    return (
        <Fragment>
            <div className="show-alumnis-home section grid wide">
                <div className="row head">
                    <div className="col l-12">
                        <h4 className="intro">Make new friends with</h4>
                        <h2 className='title'>VIETNAMESE ALUMNIS</h2>
                        <span className='intro-description'>{textDescription}</span>
                    </div>
                </div>

                <div className="albums-promo row">
                    {yearArray.map((year, index) => (
                        <div key={index} className="col l-4">
                            <AlbumPromo
                                promoYear={year}
                                divClassName='album-promo-inside'
                            ></AlbumPromo>
                        </div>
                    ))}
                </div>

                <a href="/alumni">
                    <ButtonComp
                        color = 'red'
                        size = 'large'
                        text = 'All albums' 
                        divClassName='album-promo-btn' 
                    ></ButtonComp>
                </a>

            </div>
        </Fragment>

    );
};

export default ShowAlumnisAlbumsHome;
