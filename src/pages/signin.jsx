import { login } from "/src/services/authService.js";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

// Components
// import SignUp from '/src/components/Signin/signup';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        await login(email, password);
        navigate("/admin");
    };

    return (
        <div>
            <h2>Sign In</h2>
            <label>
                Email:
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default SignInPage;