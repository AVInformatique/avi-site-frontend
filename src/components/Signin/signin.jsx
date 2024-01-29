import {useNavigate} from "react-router-dom";
import {login} from "/src/services/authService";
import {useState} from "react";


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = () => {
        login(email, password)
            .then(() => {
                navigate("/admin");
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

export default SignIn;