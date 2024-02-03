import { useState, useEffect } from 'react';
import { getAlumnisByPromotion } from '/src/services/alumniService.js';
import './albumPromo.css';

//components
import { ButtonComp } from '/src/components/General/buttonComp';

export const AlbumPromo = ({ promoYear = 2023, divClassName = '' }) => {
    const [state, dispatch] = useState('default');
    const [nbAlumnisPromo, setNbAlumnisPromo] = useState(0);
    const img = null;

    const getNumberALumnisByPromotion = async (promoYear) => {
        const alumnis = await getAlumnisByPromotion(promoYear);
        setNbAlumnisPromo( alumnis.length );
    }

    useEffect(() => {getNumberALumnisByPromotion(promoYear)},[]);

    return (
        <a className={`album-promo ${state} ${divClassName}`}
            href={`/alumni?year=${promoYear}`}
             onMouseEnter={() => { dispatch('hover'); }}
             onMouseLeave={() => { dispatch('default'); }}
             onMouseDown={() => {dispatch('press');}}
             onMouseUp={() => {dispatch('hover');}}
        >
            <div className="up-part">
                {img ? 
                    <img className="promo-img" src={img}/>
                    : <div className="promo-img"></div> 
                }
            </div>
            <div className="down-part">
                <div className="info">
                    <p className="promo">{`Promo ${promoYear-1956}`}</p>
                    <div className="details">
                        <p>{`Year entering: ${promoYear}`}</p>
                        <p>{`Number: ${nbAlumnisPromo}`}</p>
                    </div>
                </div>

                <ButtonComp
                    divClassName="button-inside"
                    color='yellow'
                    size='small'
                    text="Discover"
                    stateParrent = {state}
                />
            </div>
        </a>
    );
};
