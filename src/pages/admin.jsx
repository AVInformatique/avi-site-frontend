import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "/src/services/authService.js";
import { auth } from "/src/config/firebaseConfig.js";

// Components
import Admin from "/src/components/Admin/admin";


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
        <div>
            {user ? (
                <>
                    <p>Hello, {user.email}! <button onClick={handleSignOut}>Sign Out</button></p>

                    <Admin currentUser={user} />
                </>
            ) : (
                <p>Please sign in.</p>
        )}
        </div>
    );
}

export default AdminPage;