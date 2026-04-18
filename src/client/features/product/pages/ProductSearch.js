import { Link, useSearchParams } from "react-router-dom";
import { toSlug } from "../../../../shared/helpers/toSlug";
import { useProducts } from "../hooks/useProducts";
import { Row, Col, Card, Empty, Typography, Tag } from "antd";
import "./productSearch.scss";

const { Title, Text } = Typography;

function ProductSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const { products } = useProducts();

    const slugKeyword = toSlug(keyword);

    if (!slugKeyword) return <Empty description="Nhập từ khóa để tìm kiếm" />;

    const regex = new RegExp(slugKeyword.split("-").join(".*"), "i");

    const result = products.filter(item => {
        if (item.deleted || item.status !== "active") return false;
        return (
            regex.test(toSlug(item.slug)) ||
            regex.test(toSlug(item.title))
        );
    });

    return (
        <div className="product-search">
            <Title level={3}>
                Kết quả cho: <span>"{keyword}"</span>
            </Title>

            {result.length === 0 ? (
                <Empty description="Không tìm thấy sản phẩm" />
            ) : (
                <Row gutter={[16, 16]}>
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
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                            />
                                        }
                                    >
                                        <div className="product-card__content">
                                            <Text className="title">
                                                {item.title}
                                            </Text>

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
                                                    -{item.discountPercentage}%
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

export default ProductSearch;