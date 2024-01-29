import {useNavigate} from "react-router-dom";

import {logout} from "/src/services/authService";


const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    }

    return (
        <button onClick={handleLogout}>Log Out</button>
    )
}

export default LogOut;