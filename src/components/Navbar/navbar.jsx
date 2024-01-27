import { useState, useEffect, Fragment } from "react";
import "./navbar.css";
import aviLogo from "/src/assets/avi.svg";

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activePath, setActivePath] = useState("/");
    // console.log(window.location.pathname);

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
                        {/* <li className="login-li">
                            <a href="/log-in" className="nav-login">Sign in</a>
                        </li> */}
                    </ul>
                </div>
                <a href="/signin" className="nav-login">Login</a>
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
                        <li>
                            <a href="/signin" className="login">Login</a>
                        </li>
                        <li className={activePath === "/alumni" ? "active" : ""}>
                            <a href="/alumni">Alumnis</a>
                        </li>
                        <li className={activePath === "/guide" ? "active" : ""}>
                            <a href="/guide">Guide & Tutor</a>
                        </li>
                        {/* <li>
                            <a href="/log-in">Login</a>
                        </li> */}
                    </ul>
                </div>

                {/* <a href="/log-in" className="nav-login">Login</a> */}
            </nav>
        </Fragment>
    );
};

export default Navbar;