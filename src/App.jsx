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
import SignInPage from "/src/pages/signin";
import AdminPage from "/src/pages/admin";
import EventPage from "/src/pages/events";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            {
                (location.pathname === "/" ||
                location.pathname === "/event" ||
                location.pathname === "/alumni" ||
                location.pathname === "/guide" ||
                location.pathname === "/signin" ||
                location.pathname === "/admin")
                && (
                    <NavBar />
                )
            }
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Fragment>
    );
}

export default App;