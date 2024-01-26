import {Component} from "react";

import {logout} from "/src/services/authService";


class LogOut extends Component {

    onButtonClick = () => {
        logout()
            .then(() => {
                console.log("Logout successful");
            })
            .catch((error) => {
                console.log("Logout failed", error);
            });
        window.location.href = "/signin";
    }

    render() {
        return (
            <div>
                {/* Add "logout" button here */}
                <button onClick={this.onButtonClick}>Logout</button>
            </div>
        );
    }
}

export default LogOut;