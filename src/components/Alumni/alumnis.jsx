// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {getAlumnisByPromotion} from "/src/services/alumniService.js";
import "./alumnis.css";

// Component for displaying all alumnis
import {AlumniBox} from "./alumniBox.jsx";

class Alumnis extends Component {
    state = {
        alumnis: [],
        promotionYears: [],
        chosenPromo: new Date().getFullYear() - 1
    };

    initializePromotionYears = () => {
        const years = [];
        const currentYear = new Date().getFullYear() - 1;
        for (let i = currentYear; i >= 2015; i--) {
            years.push(i);
        }
        this.setState({ promotionYears: years });
    }

    handlePromoChange = (event) => {
        this.setState({ chosenPromo: event.target.value });
    }

    handleAlumniList = (year) => {
        getAlumnisByPromotion(parseInt(year)).then((data) => {
            this.setState({ alumnis: data });
        })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.initializePromotionYears();
        this.handleAlumniList(this.state.chosenPromo)
    }

    findAlumnis = () => {
        this.handleAlumniList(this.state.chosenPromo);
    }

    render() {
        const header = (
            <div className="header-alumni">
                <h1>ALUMNIS</h1>
                <div className="intro-alumni">
                    <p>L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA.
                            Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir.</p>
                </div>
                <div className="searchBar">
                    <label htmlFor="promotion">Promotion year</label>
                    {/* <input type="text" placeholder="Search name.." name="search"/> */}
                    <select id="promotion" name="promotion" value={this.state.chosenPromo} onChange={this.handlePromoChange}>
                        {this.state.promotionYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {/* <button type="submit"><i className="fa fa-search"></i></button> */}
                    <button type="submit" onClick={this.findAlumnis}>Find</button>
                </div>
            </div>
        );

        const alumniList = (
            <div className="row">
                <div className="big-box">
                    {this.state.alumnis.map((alumni) => (
                        <div className="column" key={alumni.id}>
                            <AlumniBox name={alumni.name} major={alumni.major} promotion={alumni.promotion} image={alumni.image} />
                        </div>
                    ))}
                </div>
            </div>
        );
    
        // Each row contains 3 alumni boxes
        // Config in alumnis.css
        return (
            <div>
                {header}
                {alumniList}
            </div>
        );
    }
}

export default Alumnis;