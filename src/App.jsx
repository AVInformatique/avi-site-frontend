import './App.css';
import { Routes, Route, useLocation } from "react-router-dom"

import { Fragment } from 'react';

// Components
import NavBar from "/src/components/Navbar/navbar";

// Pages
import HomePage from "/src/pages/home";
import Alumni from "/src/pages/alumnis";
import NotFound from "/src/pages/notfound";
import Guide from "/src/pages/guide";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            {
                (location.pathname === "/" ||
                location.pathname === "/alumni" ||
                location.pathname === "/guide")
                && (
                    <NavBar />
                )
            }
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Fragment>
    );
}

export default App;