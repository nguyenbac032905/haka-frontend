import {useAuth} from "../../features/auth/hooks/useAuth";
import {useRedirect} from "../../../shared/hooks/useRedirect";
import {Layout, Button} from "antd";
const {Header} = Layout;
function AdminHeader(){
    //xu li logout
    const {logout} = useAuth();
    const navigate = useRedirect();
    const handleLogout = () => {
        logout();
        navigate.redirect("/admin/login");
    }
    return(
        <>
            <Header className="admin-layout__header">
                <div className="admin-layout__header-inner">
                    <div className="admin-layout__logo">
                        <img src="https://res.cloudinary.com/dd8jqb4rl/image/upload/f_auto,q_auto,w_180,h_40,c_fill/v1762691161/rbcphthta9i9ertvx0s3.png" alt="logo" />
                    </div>

                    <div className="admin-layout__auth">
                        <Button type="primary" onClick={handleLogout}>ĐĂNG XUẤT</Button>
                    </div>
                </div>
            </Header>
        </>
    )
}
export default AdminHeader
