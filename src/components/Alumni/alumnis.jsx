import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAlumnisByPromotion } from "/src/services/alumniService.js";
import "./alumnis.css";
import { AlumniBox } from "./alumniBox.jsx";

const Alumnis = () => {
    const [alumnis, setAlumnis] = useState([]);
    const [promotionYears, setPromotionYears] = useState([]);
    const [chosenPromo, setChosenPromo] = useState(new Date().getFullYear() - 1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get("year");

    useEffect(() => {
        initializePromotionYears();
        const defaultYear = (year !== null && year !== "" && year <= new Date().getFullYear() - 1 && year >= 2015) ? year : new Date().getFullYear() - 1;
        handlePromoChange({ target: { value: defaultYear } });
    }, [year]);

    const initializePromotionYears = () => {
        const currentYear = new Date().getFullYear() - 1;
        const years = Array.from({ length: currentYear - 2014 }, (_, index) => currentYear - index);
        setPromotionYears(years);
    }

    const handlePromoChange = (event) => {
        const promo = event.target.value;
        setChosenPromo(promo);
        handleAlumniList(promo);
    }

    const handleAlumniList = (year) => {
        getAlumnisByPromotion(parseInt(year))
            .then((data) => setAlumnis(data))
            .catch((error) => console.error("Error fetching alumni data:", error));
    }

    const header = (
        <div className="header-alumni">
            <h1>ALUMNIS</h1>
            <div className="intro-alumni">
                <p>L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA.
                        Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir.</p>
            </div>
            <div className="searchBar">
                <label htmlFor="promotion">Promotion year</label>
                <select id="promotion" name="promotion" value={chosenPromo} onChange={handlePromoChange}>
                    {promotionYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    const alumniList = (
        <div className="row-alumni">
            <div className="big-box">
                {alumnis.map((alumni) => (
                    <div className="column-alumni" key={alumni.id}>
                        <AlumniBox {...alumni} />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {header}
            {alumniList}
        </div>
    );
}

export default Alumnis;
