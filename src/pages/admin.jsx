import Admin from '/src/components/Admin/admin';
import LogOut from '/src/components/Admin/logout';


const AdminPage = () => {
    return (
        <div>
            <Admin />
            { /* <LogOut /> */}
            <LogOut />
        </div>
    )
}

export default AdminPage;