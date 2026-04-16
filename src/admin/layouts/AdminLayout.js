import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./adminLayout.scss";
import AdminHeader from "../components/Header";
import AdminSider from "../components/Sider";
import AdminBreadCrumb from "../components/Breadcrumb";

const { Content} = Layout;
function AdminLayout() {
    return (
        <div className="admin-layout">
            <Layout className="admin-layout__wrapper">
                <AdminHeader />
                <div className="admin-layout__body">
                    <AdminBreadCrumb />
                    <Layout className="admin-layout__content-wrapper">
                        <AdminSider />
                        <Content className="admin-layout__content">
                            <div className="admin-layout__main">
                                <Outlet />
                            </div>
                        </Content>
                    </Layout>
                </div>
            </Layout>
        </div>
    );
}

export default AdminLayout;