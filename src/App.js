import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"

import { Fragment } from 'react';

// Components
import Navbar from "./components/Navbar/navbar";

// Pages
import Home from "./pages/home";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            {
                (location.pathname === "/" ||
                location.pathname === "/events" ||
                location.pathname === "/alumni" ||
                location.pathname === "/about-us") && (
                    <Navbar />
                )
            }
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Fragment>
    );
};

export default App;
