// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import "./home.css";
import aviLogo from "/src/assets/avi.svg";
import { repas_noel_img } from "/src/images.jsx";

class Home extends Component {
    render() {
        // Divide the home page into two parts
        // Left side: Introduction of AVI (Association des Vietnamiens a l'INSA)
        // Right side: An Image of AVI

        // Left side
        const leftSide = (
            <div className="left-side">
                <div className={"text-part"}>
                    {/* Logo here */}
                    <img className={"logo-home"} src={aviLogo} alt="AVI"/>
                    {/* Header here */}
                    <h1 className={"header"}>Association des Vietnamiens à l'INSA</h1>
                    {/* Introduction here */}
                    <div className={"intro"}>
                        <p>
                            L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon.
                            Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.
                        </p>
                        <p>
                            L'AVI organise des événements tout au long de l'année, comme des soirées, des sorties, des repas, des tournois sportifs, etc.
                            Elle participe également à des événements organisés par d'autres associations.
                        </p>
                        <p>
                            L'AVI est ouverte à tous les étudiants de l'INSA, vietnamiens ou non.
                        </p>

                        {/* More paragraphs here */}
                        <div className={"more"} style={{display: "none"}}>
                            <p>
                                L'AVI organise des événements tout au long de l'année, comme des soirées, des sorties, des repas, des tournois sportifs, etc.
                                Elle participe également à des événements organisés par d'autres associations.
                            </p>
                            <p>
                                L'AVI est ouverte à tous les étudiants de l'INSA, vietnamiens ou non.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

        // Right side
        const rightSide = (
            <div className="right-side">
                <img className="image-avi" src={repas_noel_img.src} alt="Repas Img"/>
            </div>
        );

        // Home page
        return (
            <div className="home">
                {leftSide}
                {rightSide}
            </div>
        );

    }
}

export default Home;