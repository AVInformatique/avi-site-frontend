import {useState, useEffect} from "react";
import {getCurrentUser} from "/src/services/authService.js";

// Components
import Admin from "/src/components/Admin/admin";
import LogOut from "/src/components/Admin/logout";


const AdminPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <Admin />
                    <LogOut />
                </div>
            ) : (
                <div>
                    <h1>Access Denied</h1>
                </div>
            )}
        </div>
    );
}

export default AdminPage;