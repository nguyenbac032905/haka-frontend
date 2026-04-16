import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../shared/helpers/cookie";
import { useEffect, useState} from "react";
import { verifyToken } from "../../features/auth/api/authService";
function AdminPrivate() {
    const tokenAdmin = getCookie("tokenAdmin");
    const emailAdmin = getCookie("emailAdmin");
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            if (!tokenAdmin) {
                setIsAdmin(false);
                return;
            }
            try {
                const user = await verifyToken(emailAdmin, tokenAdmin);
                setIsAdmin(user && user.length > 0);
            } catch (error) {
                setIsAdmin(false);
            }
        };
        fetchApi();
    }, [tokenAdmin, emailAdmin]);
    if (isAdmin === null) {
        return <div>Loading...</div>; // chặn redirect sớm
    }
    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
export default AdminPrivate;