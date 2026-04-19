import { useParams } from "react-router-dom";
import { useProductBySlug } from "../hooks/useProductBySlug";
import { Row, Col, InputNumber, Button, Typography, Divider, message } from "antd";
import { useState } from "react";
import "./productDetail.scss";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../../shared/helpers/cookie";
import { addToCart } from "../../cart/cartSlice";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

const { Title, Text } = Typography;

function ProductDetail() {
    const { slugProduct } = useParams();
    const { product, loading } = useProductBySlug(slugProduct);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartId = getCookie("cartId");
    const redirect = useRedirect();

    if (loading || !product) return <p>Loading...</p>;

    const {
        title,
        price,
        discountPercentage,
        stock,
        sold,
        thumbnail,
        description,
        content
    } = product;

    const priceNew = price * (1 - discountPercentage / 100);

    const handleAddToCart = async () => {
        if (quantity > stock) {
            message.error("Không đủ số lượng sản phẩm trong kho!");
            return;
        }
        await dispatch(addToCart({ cartId, product, quantity })).unwrap();
        message.success("Thêm vào giỏ hàng thành công!");
        redirect.redirect("/cart");
    };

    return (
        <div className="product-detail">
            {/* ROW TRÊN */}
            <Row gutter={24} className="product-detail__top">
                {/* ẢNH */}
                <Col span={10}>
                    <div className="product-detail__image">
                        <img src={thumbnail} alt={title} />
                    </div>
                </Col>

                {/* THÔNG TIN */}
                <Col span={14}>
                    <div className="product-detail__info">
                        <Title level={3}>{title}</Title>

                        <Text type="secondary">
                            Đã bán: {sold} | Còn lại: {stock}
                        </Text>

                        <div className="product-detail__price">
                            <span className="old-price">
                                {price.toLocaleString()}₫
                            </span>

                            <span className="new-price">
                                {priceNew.toLocaleString()}₫
                            </span>

                            <span className="discount">
                                -{discountPercentage}%
                            </span>
                        </div>

                        {/* SỐ LƯỢNG */}
                        <div className="product-detail__quantity">
                            <Text>Số lượng:</Text>
                            <InputNumber
                                min={1}
                                value={quantity}
                                onChange={(value) => setQuantity(value)}
                            />
                        </div>

                        {/* BUTTON */}
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </Col>
            </Row>

            <Divider />

            {/* ROW DƯỚI */}
            <Row className="product-detail__bottom">
                <Col span={24}>
                    <Title level={4}>Mô tả sản phẩm</Title>
                    <p>{description}</p>

                    <Title level={4}>Thông tin chi tiết</Title>
                    <p>{content}</p>
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetail;