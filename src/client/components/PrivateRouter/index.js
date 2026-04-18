import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../shared/helpers/cookie";
import { useEffect, useState} from "react";
import { verifyToken } from "../../features/auth/api/authService";
function ClientPrivate() {
    const tokenUser = getCookie("tokenUser");
    const emailUser = getCookie("emailUser");
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            if (!tokenUser) {
                setIsLogin(false);
                return;
            }
            try {
                const user = await verifyToken(emailUser, tokenUser);
                setIsLogin(user && user.length > 0);
            } catch (error) {
                setIsLogin(false);
            }
        };
        fetchApi();
    }, [tokenUser, emailUser]);
    if (isLogin === null) {
        return <div>Loading...</div>; // chặn redirect sớm
    }
    return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ClientPrivate;