import './App.css';
import { Routes, Route, useLocation } from "react-router-dom"

import { Fragment } from 'react';

// Components
import NavBar from "/src/components/Navbar/navbar";
import Footer from "/src/components/Footer/footer";

// Pages
import HomePage from "/src/pages/home";
import Alumni from "/src/pages/alumnis";
import NotFound from "/src/pages/notfound";
import GuidePage from "/src/pages/guide";
import EventPage from "/src/pages/events";
import EventIdPage from "/src/pages/eventId"
import SignInPage from "/src/pages/signin";
import AdminPage from "/src/pages/admin";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            {
                // (location.pathname === "/" ||
                // location.pathname.includes("/event") ||
                // location.pathname === "/alumni" ||
                // location.pathname === "/guide" ||
                // location.pathname === "/signin" ||
                // location.pathname === "/admin")
                // && (
                    <NavBar />
                //)
            }
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event/:id" element={<EventIdPage />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer></Footer>
        </Fragment>
    );
}

export default App;