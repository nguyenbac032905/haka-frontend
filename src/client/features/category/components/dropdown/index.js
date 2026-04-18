import { useState } from "react";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { buildCategoryTree } from "../../../../../shared/helpers/createTree";
import { RightOutlined } from "@ant-design/icons";
import "./category.scss";
import { MenuOutlined } from "@ant-design/icons";

function Category() {
    const { categories, loading } = useCategories();
    const categoryTree = buildCategoryTree(categories);

    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();

    if (loading) return null;

    const handleClick = (slug) => {
        navigate(`/category/${slug}`);
    };

    const menu = (
        <div className="mega-menu">
            {/* LEFT - cấp 1 */}
            <div className="mega-menu__left">
                {categoryTree.map((cat) => (
                    <div
                        key={cat.id}
                        className={`mega-menu__item ${
                            activeCategory?.id === cat.id ? "active" : ""
                        }`}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => handleClick(cat.slug)}
                    >
                        {/* thumbnail (optional) */}
                        {cat.thumbnail && (
                            <img
                                src={cat.thumbnail}
                                alt={cat.title}
                                className="mega-menu__thumb"
                            />
                        )}

                        <span className="mega-menu__title">
                            {cat.title}
                        </span>

                        {/* arrow nếu có children */}
                        {cat.children?.length > 0 && (
                            <RightOutlined className="mega-menu__icon" />
                        )}
                    </div>
                ))}
            </div>

            {/* RIGHT - cấp 2 */}
            <div className="mega-menu__right">
                {activeCategory?.children?.length > 0 ? (
                    activeCategory.children.map((child) => (
                        <div
                            key={child.id}
                            className="mega-menu__child"
                            onClick={() => handleClick(child.slug)}
                        >
                            {child.thumbnail && (
                                <img
                                    src={child.thumbnail}
                                    alt={child.title}
                                    className="mega-menu__child-thumb"
                                />
                            )}

                            <span className="mega-menu__child-title">
                                {child.title}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="mega-menu__empty">
                        Không có danh mục
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="category">
            <Dropdown
                trigger={["hover"]}
                placement="bottomLeft"
                dropdownRender={() => menu}
                overlayClassName="category-dropdown"
            >
                <div className="category__trigger">
                    <MenuOutlined className="category__trigger-icon" />
                    <span>Danh mục</span>
                </div>
            </Dropdown>
        </div>
    );
}

export default Category;