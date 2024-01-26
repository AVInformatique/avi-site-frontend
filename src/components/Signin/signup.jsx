import {Component} from "react";
import {signup} from "/src/services/authService";


class SignUp extends Component {
    onButtonClick = () => {
        // Get email and password from form
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // Call API to sign up
        signup(email, password)
            .then((response) => {
                console.log(response);
                // Add alert to show success
                alert("Sign up successful!");
                // Redirect to signin page
                // eslint-disable-next-line react/prop-types
                window.location.href = "/signin";
            })
            .catch((error) => {
                console.log(error);
                // Add alert to show error
                alert("Sign up failed!");
            });
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                {/* TODO: Add form here with email and password fields */}
                <form>
                    <label>
                        Email:
                        <input type="text" name="email" id="email" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" id="password" />
                    </label>
                </form>
                <button onClick={this.onButtonClick}>Sign Up</button>
            </div>
        )
    }
}

export default SignUp;