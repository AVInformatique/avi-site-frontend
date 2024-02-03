import { login } from "/src/services/authService.js";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

import './signin.css'

// Components
import { ButtonComp } from '/src/components/General/buttonComp';

const SignInPage = () => {
    const notification = `Attention, this page supports only admin users!`

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        await login(email, password);
        navigate("/admin");
    };

    return (
        <div className="signin section">
            <div className="container">
                <h1 className="title col l-12">Sign In</h1>
                <p className="description col l-12">{notification}</p>
                <form className="form col l-12">
                    <div className="form-row"> <div className="input-data">
                            <input type="text" name="email" required
                                value={email} onChange={(event) => setEmail(event.target.value)}/><br/>
                            <div className="underline"></div>
                            <label htmlFor="email">Email</label>
                    </div></div>

                    <div className="form-row"> <div className="input-data">
                            <input type="password" name="password" required 
                                value={password} onChange={(event) => setPassword(event.target.value)}/><br/>
                            <div className="underline"></div>
                            <label htmlFor="password">Password</label>
                    </div></div>
                </form>

                <ButtonComp 
                    divClassName="btn-inside"
                    size="small"
                    text="Sign In"                       
                    callback={handleSignIn}
                >Sign Up</ButtonComp>

            </div>

        </div>
    );
}

export default SignInPage;