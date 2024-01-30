import { useState, useEffect, Fragment } from "react";
import "./navbar.css";
import { auth } from "/src/config/firebaseConfig.js";
import aviLogo from "/src/assets/avi.svg";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activePath, setActivePath] = useState("/");

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActivePath(currentPath);

        const handleNavigation = () => {
            const newPath = window.location.pathname;
            setActivePath(newPath);
        };
        window.addEventListener("pathchange", handleNavigation);

        return () => {
            window.removeEventListener("pathchange", handleNavigation);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <Fragment>
            <nav className="navigation computer-view">
                <a href="/" className="logo-nav"><img src={aviLogo} alt="Logo AVI"/></a>

                <button
                    className="hamburger"
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div
                    className={
                        isExpanded ? "navigation-menu expanded" : "navigation-menu"
                    }
                >
                    <ul>
                        <li className={activePath === "/" ? "active" : ""}>
                            <a href="/">Home</a>
                        </li>
                        <li className={activePath === "/event" ? "active" : ""}>
                            <a href="/event">Events</a>
                        </li>
                        <li className={activePath === "/alumni" ? "active" : ""}>
                            <a href="/alumni">Alumnis</a>
                        </li>
                        <li className={activePath === "/guide" ? "active" : ""}>
                            <a href="/guide">Guide & Tutor</a>
                        </li>
                    </ul>
                </div>
                {/* If user is null, redirect to sign-in page.
                Or else, redirect to admin page */}
                { user ? (
                    <a href="/admin" className="nav-login">Admin</a>
                ) : (
                    <a href="/signin" className="nav-login">Login</a>
                )}
            </nav>

            <nav className="navigation tel-view">
                <a href="/" className="logo"><img src={aviLogo} alt="Logo AVI"/></a>

                <button
                    className="hamburger"
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div
                    className={
                        isExpanded ? "navigation-menu expanded" : "navigation-menu"
                    }
                >
                    <ul>
                    <li className={activePath === "/" ? "active" : ""}>
                            <a href="/">Home</a>
                        </li>
                        <li className={activePath === "/event" ? "active" : ""}>
                            <a href="/event">Events</a>
                        </li>
                        <li className={activePath === "/alumni" ? "active" : ""}>
                            <a href="/alumni">Alumnis</a>
                        </li>
                        <li className={activePath === "/guide" ? "active" : ""}>
                            <a href="/guide">Guide & Tutor</a>
                        </li>

                        {/* If user is null, redirect to sign-in page.
                        Or else, redirect to admin page */}
                        { user ? (
                            <li>
                                <a href="/admin" className="login">Admin</a>
                            </li>
                        ) : (
                            <li>
                                <a href="/signin" className="login">Login</a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;