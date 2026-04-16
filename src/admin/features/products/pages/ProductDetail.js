import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProductById";
import { Row, Col, Card, Image, Spin, Descriptions, Tag } from "antd";
import { useCategoryById } from "../../product-category/hooks/useCategoryById";

function ProductDetail() {
    const { id } = useParams();
    const { product, loading } = useProductById(id);

    // luôn gọi hook trước return (rule hooks)
    const categoryId = product?.product_category_id;
    const { category } = useCategoryById(categoryId);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 200 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    return (
        <Row gutter={24} style={{ padding: 20 }}>
            {/* ẢNH */}
            <Col span={8}>
                <Card>
                    <Image
                        width="100%"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </Card>
            </Col>

            {/* THÔNG TIN */}
            <Col span={16}>
                <Card title="Chi tiết sản phẩm">
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên sản phẩm">
                            {product.title}
                        </Descriptions.Item>

                        <Descriptions.Item label="Danh mục">
                            {category?.title || "Đang tải..."}
                        </Descriptions.Item>

                        <Descriptions.Item label="Giá">
                            {product.price?.toLocaleString("vi-VN")} đ
                        </Descriptions.Item>

                        <Descriptions.Item label="Trạng thái">
                            {product.status === "active" ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">Inactive</Tag>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mô tả">
                            {product.description || "Không có mô tả"}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
        </Row>
    );
}

export default ProductDetail;

