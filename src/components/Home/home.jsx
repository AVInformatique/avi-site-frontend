import React, { Component, Fragment } from "react";

import "./home.css";

import WelcomeHome  from "./sections/WelcomeHome"
import WhoAreWeHome from "./sections/WhoAreWeHome";
import ShowTreeEvents from "../Event/sections/ShowTreeEvents"
import ShowAlumnisAlbumsHome from  "./sections/ShowAlumnisAlbumsHome";
import GuideHome from "./sections/GuideHome"

const Home = () => {
    return (
        <Fragment>
            <WelcomeHome></WelcomeHome>
            <WhoAreWeHome></WhoAreWeHome>
            <ShowTreeEvents></ShowTreeEvents>
            <ShowAlumnisAlbumsHome></ShowAlumnisAlbumsHome>
            <GuideHome></GuideHome>
        </Fragment>)
}

export default Home;