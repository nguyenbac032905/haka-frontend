import "./header.scss";
import { Input, Badge, Dropdown, Avatar, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRedirect } from "../../../shared/hooks/useRedirect";
import {logout,loginSuccess} from "../../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Category from "../../features/category/components/dropdown";
import { deleteCookie, getCookie } from "../../../shared/helpers/cookie";
import { verifyToken } from "../../features/auth/api/authService";
import { useProducts } from "../../features/product/hooks/useProducts";
import { toSlug } from "../../../shared/helpers/toSlug";

const { Search } = Input;

function Header() {
    const navigate = useRedirect();
    const {user, isLogin} = useSelector(state => state.auth);
    const {items} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const countProduct = items?.reduce((sum,item) => sum + item.quantity,0);
    //search
    const {products} = useProducts();
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setKeyword(value);

        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }

        setShowSuggest(true);

        const slugKeyword = toSlug(value);
        const regex = new RegExp(slugKeyword.split("-").join(".*"), "i");

        const result = products.filter(item => {
            if (item.deleted || item.status !== "active") return false;
            return regex.test(toSlug(item.slug));
        });

        setSuggestions(result.slice(0, 5));
    };
    const handleCloseSuggest = () => {
        setShowSuggest(false);
    };
    const tokenUser = getCookie("tokenUser");
    const emailUser = getCookie("emailUser");
    useEffect(() => {
        const fetchUser = async () => {
            if (!tokenUser) return;

            try {
                const res = await verifyToken(emailUser,tokenUser);
                if (res && res.length > 0) {
                    dispatch(loginSuccess(res[0]));
                }
            } catch (error) {
                dispatch(logout());
            }
        };

        fetchUser();
    }, [tokenUser, dispatch]);
    const handleLogout = () => {
        dispatch(logout());
        deleteCookie("tokenUser");
        deleteCookie("emailUser");
        deleteCookie("cartId");
        navigate.redirect("/login");
    };
    const menuItems = [
        {
            key: "my-orders",
            label: <Link to="/my-orders">Đơn hàng của tôi</Link>
        },
        {
            key: "logout",
            label: <span onClick={handleLogout}>Đăng xuất</span>
        }
    ];
    //xu li search
    return (
        <header className="header">
            <div className="header__container">
                {/* Logo */}
                <div className="header__logo">
                    <Link to="/"><img src="https://haka.vn/wp-content/uploads/2024/01/Haka-Logo.png" alt="logo" /></Link>
                </div>

                {/* Search */}
                <div className="header__category">
                    <Category />
                </div>
                <div className="header__search">
                    <Search
                        placeholder="Tìm kiếm sản phẩm..."
                        allowClear
                        value={keyword}
                        onChange={handleSearchChange}
                        onSearch={(value) => {
                            navigate.redirect(`/products?keyword=${value}`);
                            setShowSuggest(false);
                        }}
                    />

                    {showSuggest && suggestions.length > 0 && (
                        <div className="search-suggest">
                            <div className="search-suggest__header">
                                <span>Gợi ý sản phẩm</span>
                                <button onClick={handleCloseSuggest}>✕</button>
                            </div>

                            {suggestions.map(item => (
                                <div
                                    key={item.id}
                                    className="search-suggest__item"
                                    onClick={() => {
                                        navigate.redirect(`/product/${item.slug}`);
                                        setShowSuggest(false);
                                    }}
                                >
                                    <img src={item.thumbnail} alt="" />

                                    <div className="info">
                                        <div className="title">{item.title}</div>
                                        <div className="meta">
                                            <span>Còn: {item.stock}</span>
                                            <span>
                                                {(
                                                    item.price *
                                                    (1 - item.discountPercentage / 100)
                                                ).toLocaleString()}đ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Menu */}
                <div className="header__menu">
                    <span className="header__item"><Link to="/">Trang chủ</Link></span>
                    <Badge count={countProduct}>
                        <Link to="/cart"><ShoppingCartOutlined className="header__cart" /></Link>
                    </Badge>
                </div>
                <div className="header__actions">
                    {/* Auth */}
                    {!isLogin ? (
                        <div className="header__auth">
                            <span className="header__login"><a href="/login">Đăng nhập</a></span>
                            <span className="header__register"><a href="/register">Đăng ký</a></span>
                        </div>
                    ) : (
                        <Dropdown
                            menu={{ items: menuItems }}
                            placement="bottomRight"
                            trigger={["hover"]}
                        >
                            <Space className="header__user">
                                <Avatar icon={<UserOutlined />} />
                                {user?.fullName}
                            </Space>
                        </Dropdown>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;