import {Navbar, Nav, Button} from "react-bootstrap";
import React, {Component} from "react";
import "./navbar.css";
import "/src/assets/avi.svg";


class NavBar extends Component {
    render() {
        // set NavBar background color to light and expand to large
        // set the brand to AVI logo
        // set the buttons to Home and Alumni
        // style of buttons is set in navbar.css
        return (
            <Navbar bg="light" expand="lg" className={"navbar"}>
                <Navbar.Brand href="/" className={"logo"}>
                    <img
                        src="/src/assets/avi.svg"
                        className="d-inline-block align-top"
                        alt="AVI logo"
                    />
                </Navbar.Brand>
                <Nav>
                    <Button className="navButton active" onClick={() => window.location.href = "/"}>Home
                    </Button>
                    <Button className="navButton active" onClick={() => window.location.href = "/alumni"}>Alumni
                    </Button>
                    <Button className="navButton active" onClick={() => window.location.href = "/guide"}>Guide &amp; Tutor
                    </Button>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;