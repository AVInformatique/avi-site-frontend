import {Component} from "react";
import {signup} from "/src/services/authService";

import { ButtonComp } from '/src/components/General/buttonComp';

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
            <div className="grid wide signup section ">
                <div className="row container">
                    <h1 className="title-part col l-12">Sign Up</h1>
                    <form className="form col l-12">
                        <div className="form-row"> <div className="input-data">
                                <input type="text" name="email" required/><br/>
                                <div className="underline"></div>
                                <label htmlFor="email">Name</label>
                        </div></div>

                        <div className="form-row"> <div className="input-data">
                                <input type="text" name="password" required /><br/>
                                <div className="underline"></div>
                                <label htmlFor="password">Password</label>
                        </div></div>
                    </form>

                    <ButtonComp 
                        size="medium"
                        text="Sign In"                       
                        callback={this.onButtonClick}
                    >Sign Up</ButtonComp>

                </div>
                
            </div>
        )
    }
}

export default SignUp;