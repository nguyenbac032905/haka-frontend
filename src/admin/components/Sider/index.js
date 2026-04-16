import { Layout, Menu } from "antd";
import { ProductOutlined,DashboardOutlined,AppstoreAddOutlined,FileTextOutlined} from "@ant-design/icons";
import React from "react";
import { useLocation,Link } from "react-router-dom";
const { Sider } = Layout;
function AdminSider(){
    const location = useLocation();
    //tao những nav
    const navs = [
        {
            key: "/admin/dashboard",
            icon: React.createElement(DashboardOutlined),
            label: <Link to="/admin/dashboard">Dashboard</Link>
        },
        {
            key: "/admin/products",
            icon: React.createElement(ProductOutlined),
            label: <Link to="/admin/products">Product</Link>,
            children: [
                {
                    key: "/admin/products/create",
                    label: <Link to="/admin/products/create">Product Create</Link>
                }
            ]
        },
        {
            key: "/admin/product-category",
            icon: React.createElement(AppstoreAddOutlined),
            label: <Link to="/admin/product-category">Category</Link>,
            children: [
                {
                    key: "/admin/product-category/create",
                    label: <Link to="/admin/product-category/create">Category Create</Link>
                }
            ]
        },
        {
            key: "/admin/orders",
            icon: React.createElement(FileTextOutlined),
            label: <Link to="/admin/orders">Order</Link>,
        }
    ];
    return(
        <>
            <Sider className="admin-layout__sider" width={220}>
                <Menu
                    mode="inline"
                    items={navs}
                    selectedKeys={[location.pathname]}
                    className="admin-layout__menu"
                />
            </Sider>
        </>
    )
}
export default AdminSider;