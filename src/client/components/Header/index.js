import "./header.scss";
import { Input, Badge, Dropdown, Avatar, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Search } = Input;

function Header() {
    const [user, setUser] = useState({
        name: "Bac Nguyen"
    });
    // setUser(null) => chưa đăng nhập

    const handleLogout = () => {
        setUser(null);
    };

    const menuItems = [
        {
            key: "profile",
            label: <span>Thông tin cá nhân</span>
        },
        {
            key: "logout",
            label: <span onClick={handleLogout}>Đăng xuất</span>
        }
    ];

    return (
        <header className="header">
            <div className="header__container">
                {/* Logo */}
                <div className="header__logo">
                    <a href="/"><img src="https://haka.vn/wp-content/uploads/2024/01/Haka-Logo.png" alt="logo" /></a>
                </div>

                {/* Search */}
                <div className="header__search">
                    <Search placeholder="Tìm kiếm sản phẩm..." allowClear />
                </div>

                {/* Menu */}
                <div className="header__menu">
                    <span className="header__item"><a href="/">Trang chủ</a></span>
                    <Badge count={2}>
                        <ShoppingCartOutlined className="header__cart" />
                    </Badge>
                </div>
                <div className="header__actions">
                    {/* Auth */}
                    {!user ? (
                        <div className="header__auth">
                            <span className="header__login">Đăng nhập</span>
                            <span className="header__register">Đăng ký</span>
                        </div>
                    ) : (
                        <Dropdown
                            menu={{ items: menuItems }}
                            placement="bottomRight"
                            trigger={["hover"]}
                        >
                            <Space className="header__user">
                                <Avatar icon={<UserOutlined />} />
                                {user.name}
                            </Space>
                        </Dropdown>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;