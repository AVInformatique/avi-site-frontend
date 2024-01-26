import {Component} from "react";
import {login} from "/src/services/authService";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onButtonClick = () => {
        // Get email and password from the input fields
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Call login service
        login(email, password)
            .then((response) => {
                console.log(response);
                // Redirect to admin page
                // eslint-disable-next-line react/prop-types
                window.location.href = "/admin";
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h1>Sign In</h1>
                {/* TODO: Add sign in form here. Signin form has email and password fields. */}
                <form>
                    <label>
                        Email:
                        <input type="text" name="email" id={"email"} />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" id={"password"} />
                    </label>
                </form>
                <button onClick={this.onButtonClick}>Sign In</button>
            </div>
        )
    }
}

export default SignIn;