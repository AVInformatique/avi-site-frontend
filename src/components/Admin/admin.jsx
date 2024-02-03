import { logout } from "/src/services/authService.js";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import PropTypes from "prop-types";


import AdminEvents from "./adminEvents";
import AdminAlumnis from "./adminAlumnis";


const Admin = (props) => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await logout();
        navigate("/signin");
    };

    const renderHeader = (
        <div className="header-admin">
            <h1>ADMIN</h1>
            <div className="head-bar">
                <p>Your email: {props.currentUser.email}</p> 
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );

    return (
        <div className="admin-content">
            {renderHeader}
            <AdminAlumnis
                currentUser={props.currentUser}    
            />
            <AdminEvents
                currentUser={props.currentUser}
            />

        </div>
    );
}

Admin.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default Admin;