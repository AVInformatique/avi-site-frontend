import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "/src/services/authService.js";
import { auth } from "/src/config/firebaseConfig.js";

// Components
import Admin from "../components/Admin/admin";

const AdminPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log(user);
        });

        return unsubscribe;
    }, []);

    const errorStyles = {
        color: "red",
        fontSize: "20px",
        textAlign: "center",
        marginTop: "200px",
        marginBottom: "200px",
    };

    return (
        <div className="admin" style={errorStyles}>
            {user ? (
                <>
                    <Admin currentUser={user} />
                </>
            ) : (
                <h1>Oops, it seems that you're not logged in yet!</h1>
            )}
        </div>
    );
};

export default AdminPage;
