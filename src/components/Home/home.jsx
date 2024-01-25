// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./home.css";
import {aviLogo, repasNoel} from "/src/constants";

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
                    <img src={aviLogo} alt="AVI" style={{width: "50%", height: "50%"}}/>
                    {/* Header here */}
                    <h1 className={"header"}>Association des Vietnamiens à l'INSA</h1>
                    {/* Introduction here */}
                    <div className={"intro"}>
                        <p>
                            L'Association des Vietnamiens à l'INSA (AVI) est une association étudiante de l'INSA de Lyon.
                            Elle a pour but de promouvoir la culture vietnamienne au sein de l'école et de la faire découvrir aux autres étudiants.
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

                    {/* Add "More" button here
                    If the button is clicked, the page show the next 2 paragraphs
                    Button is hidden after clicked
                    */}
                    <Button className={"button-more"} variant="outline-primary" size="sm" onClick={() => {
                        document.getElementsByClassName("more")[0].style.display = "block";
                        document.getElementsByClassName("button-more")[0].style.display = "none";
                    }}>More</Button>
                </div>
            </div>
        );

        // Right side
        const rightSide = (
            <div className="right-side">
                <img src={repasNoel} alt="AVI" style={{width: "80%", height: "80%"}}/>
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