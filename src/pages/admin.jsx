import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "/src/services/authService.js";
import { auth } from "/src/config/firebaseConfig.js";

import './admin.css'

// Components
import AdminAlumnis from "/src/components/Admin/AdminAlumnis";
import AdminEvents from "/src/components/Admin/AdminEvents";
import { ButtonComp } from '/src/components/General/buttonComp';

const AdminPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    const handleSignOut = async () => {
        await logout();
        navigate("/signin");
    };

    return (
        <div className="admin">
            {user ? (
                <div className = "admin-logged-in">
                    <div className="welcome-admin grid wide">
                        <p className="welcome-phrase">Hello, {user.email}! </p>
                        <ButtonComp 
                            divClassName="button-log-out" 
                            size = "small"
                            text="Sign out"
                            callback={handleSignOut}>Sign Out</ButtonComp>
                    </div>
                    
                    <AdminAlumnis currentUser={user} />
                    <AdminEvents currentUser={user} />
                </div>
            ) : (
                <p>Please sign in.</p>
        )}
        </div>
    );
}

export default AdminPage;