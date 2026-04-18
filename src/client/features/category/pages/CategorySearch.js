import { Link, useParams } from "react-router-dom";
import { useCategoryBySlug } from "../hooks/useCategoryBySlug";
import { buildCategoryTree, getAllSubCategory } from "../../../../shared/helpers/createTree";
import { useProducts } from "../../product/hooks/useProducts";
import { Card, Row, Col, Typography, Tag, Empty } from "antd";
import "./categorySearch.scss";
import { useCategories } from "../hooks/useCategories";

const { Title } = Typography;

function CategorySearch() {
    const { slugCategory } = useParams();
    const {categories} = useCategories();
    const { category } = useCategoryBySlug(slugCategory);
    
    const { products } = useProducts();
    const categoryTree = categories ? buildCategoryTree(categories) : [];
    // lấy tất cả sub category id
    const allSubsCategory = category
        ? getAllSubCategory(categoryTree,category.id)
        : [];
    console.log(allSubsCategory)
    // lọc sản phẩm theo category + subcategory
    const result = products.filter(item => {
        return allSubsCategory.includes(String(item.product_category_id));
    }); 

    return (
        <div className="category-search">
            <Title level={3} className="category-search__title">
                Danh mục: {category?.title || "Loading..."}
            </Title>

            {result.length === 0 ? (
                <Empty description="Không có sản phẩm trong danh mục này" />
            ) : (
                <Row gutter={[20, 20]}>
                    {result.map(item => {
                        const finalPrice =
                            item.price *
                            (1 - item.discountPercentage / 100);

                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                               <Link to={`/product/${item.slug}`}>
                                    <Card
                                        hoverable
                                        className="product-card"
                                        cover={
                                            <div className="product-card__image">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                />
                                                <Tag className="discount">
                                                    -{item.discountPercentage}%
                                                </Tag>
                                            </div>
                                        }
                                    >
                                        <div className="product-card__body">
                                            <div className="title">
                                                {item.title}
                                            </div>

                                            <div className="price">
                                                <span className="new">
                                                    {finalPrice.toLocaleString()}đ
                                                </span>
                                                <span className="old">
                                                    {item.price.toLocaleString()}đ
                                                </span>
                                            </div>

                                            <div className="meta">
                                                <Tag color="blue">
                                                    Còn: {item.stock}
                                                </Tag>
                                                <Tag color="green">
                                                    Đã bán: {item.sold}
                                                </Tag>
                                            </div>
                                        </div>
                                    </Card>
                               </Link>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
}

export default CategorySearch;