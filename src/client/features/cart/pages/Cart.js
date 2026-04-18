import { Row, Col, Card, InputNumber, Button, Typography, Empty, Divider, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getCookie } from "../../../../shared/helpers/cookie";
import { useProducts } from "../../product/hooks/useProducts";
import {useDispatch, useSelector} from "react-redux";
import { fetchCart, removeItem, updateQuantity } from "../cartSlice";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import "./cart.scss"

const { Title, Text } = Typography;

function Cart() {
    const userId = getCookie("userId");
    const dispatch = useDispatch();
    const {items, loading} = useSelector(state => state.cart);

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [userId, dispatch]);

    const { products } = useProducts();

    // merge product + cart item
    const cartDetail = items?.map(item => {
        const product = products?.find(p => String(p.id) == String(item.product_id));
        return {
            ...item,
            product
        };
    });

    // tính tổng tiền
    const totalPrice = cartDetail?.reduce((sum, item) => {
        if (!item.product) return sum;

        const priceNew = item.product.price * (1 - item.product.discountPercentage / 100);
        return sum + priceNew * item.quantity;
    }, 0);

    // xử lý update quantity (fake)
    const handleChangeQty = (value, item) => {
        const itemId=item.id;
        const quantity = value;
        dispatch(updateQuantity({itemId, quantity}));
        message.success("Cập nhật số lượng thành công");
    };

    // xử lý xoá (fake)
    const handleDelete = (item) => {
        dispatch(removeItem(item.id))
        message.success("Xóa sản phẩm thành công");
    };

    return (
        <div className="cart">
            <div className="cart__container">
                <Row gutter={24}>
                    
                    {/* LEFT */}
                    <Col span={16}>
                        <div className="cart__left">
                            <Title level={4}>Giỏ hàng</Title>

                            {!cartDetail || cartDetail.length === 0 ? (
                                <Empty description="Không có sản phẩm trong giỏ hàng" />
                            ) : (
                                cartDetail.map(item => {
                                    const p = item.product;
                                    if (!p) return null;

                                    const priceNew = p.price * (1 - p.discountPercentage / 100);

                                    return (
                                        <div key={item.id} className="cart__item">

                                            <img src={p.thumbnail} alt={p.title} />

                                            <div className="cart__item-info">
                                                <div className="title">{p.title}</div>

                                                <div className="price">
                                                    <span className="old">
                                                        {p.price.toLocaleString()}₫
                                                    </span>
                                                    <span className="new">
                                                        {priceNew.toLocaleString()}₫
                                                    </span>
                                                </div>

                                                <div className="actions">
                                                    <InputNumber
                                                        min={1}
                                                        value={item.quantity}
                                                        onChange={(value) => handleChangeQty(value, item)}
                                                    />

                                                    <Button
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Col>

                    {/* RIGHT */}
                    <Col span={8}>
                        <div className="cart__right">
                            <Title level={4}>Tổng giỏ hàng</Title>

                            <div className="cart__total">
                                <span>Tạm tính</span>
                                <b>{totalPrice?.toLocaleString() || 0}₫</b>
                            </div>

                            <Divider />

                            <Link to="/checkout">
                                <Button
                                    type="primary"
                                    block
                                    className="cart__btn"
                                    disabled={!cartDetail || cartDetail.length === 0}
                                >
                                    Thanh toán
                                </Button>
                            </Link>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    );
}

export default Cart;