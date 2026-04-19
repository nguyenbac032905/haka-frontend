import { Button, Col, Divider, Input, message, Radio, Row ,Typography} from "antd";
import { getCookie } from "../../../../shared/helpers/cookie";
import { useProducts } from "../../product/hooks/useProducts";
import { useCartItem } from "../hooks/useCartItem";
import { useState } from "react";
import "./checkout.scss";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useCreateOrderItem } from "../hooks/useCreateOrderItem";
import {useRedirect} from "../../../../shared/hooks/useRedirect";
import { useDispatch } from "react-redux";
import { clearCart } from "../cartSlice";
import {useUpdateProductField} from "../../product/hooks/useUpdateProductField";
const { Title } = Typography;

function Checkout(){
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        paymentMethod: "cod"
    });
    const {handleCreateOrder} = useCreateOrder();
    const {handleCreateOrderItems} = useCreateOrderItem();
    const {handleUpdateField} = useUpdateProductField();
    const redirect = useRedirect();
    const dispatch = useDispatch();

    const cartId = getCookie("cartId");
    const userId = getCookie("userId");
    const {items,loading} = useCartItem(cartId);
    console.log(items)
    const { products } = useProducts();
    const cartDetail = (items && products?.length > 0) 
  ? items.map(item => {
        const product = products.find(p => p.id == item.product_id);

        const price = product?.price || 0;
        const discount = product?.discountPercentage || 0;
        const finalPrice = price * (1 - discount / 100);

        return {
            ...item,
            product,
            price,
            discount,
            finalPrice,
            total: finalPrice * item.quantity
        };
    })
  : [];
    const totalPrice = cartDetail?.reduce((sum, item) => sum + item.total, 0);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleOrder = async () => {
        if (!form.fullName || !form.phone || !form.address) {
            message.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // 1. tạo order
        const orderData = {
            user_id: Number(userId),
            ...form,
            status: "initial",
            paymentStatus: "pending",
            deleted: false,
            createdAt: new Date().toISOString()
        };
        const newOrder = await handleCreateOrder(orderData);
        if (!newOrder) return;
        const dataItems = cartDetail.map(item => ({
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity,
            discountPercentage: item.discount
        }));
        // ✅ 3. tạo order items
        const success = await handleCreateOrderItems(dataItems, newOrder.id);
        if (!success) return;
        dispatch(clearCart(cartId))
        // ✅ 4. cập nhật sold + stock
        for (const item of cartDetail) {
            const product = item.product;
            if (!product) continue;

            const newSold = (product.sold || 0) + item.quantity;
            const newStock = (product.stock || 0) - item.quantity;

            await handleUpdateField(product.id, "sold", newSold);
            await handleUpdateField(product.id, "stock", newStock);
        }
        if(orderData.paymentMethod == "bank"){
            redirect.redirect(`/create_payment_url/${newOrder.id}`);
            return;
        }
        message.success("Đặt hàng thành công!");
        redirect.redirect(`/success/${newOrder.id}`);
    };

    return(
        <>
            <div className="checkout">
                <div className="checkout__container">
                    <Row gutter={20}>
                        {/* LEFT */}
                        <Col span={16}>
                            <div className="checkout__left">
                                <Title level={4}>Sản phẩm</Title>

                                {cartDetail?.map(item => (
                                    <div key={item.id} className="checkout__item">
                                        <img src={item.product?.thumbnail} />

                                        <div className="checkout__item-info">
                                            <div className="title">{item.product.title}</div>
                                            <div className="quantity">SL: {item.quantity}</div>
                                            <div className="price">
                                                {item.finalPrice.toLocaleString()} đ
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* RIGHT */}
                        <Col span={8}>
                            <div className="checkout__right">
                                <Title level={4}>Thanh toán</Title>

                                <Divider />

                                <div className="checkout__total">
                                    <span>Tổng tiền</span>
                                    <b>{totalPrice?.toLocaleString()} đ</b>
                                </div>

                                <Divider />

                                <div className="checkout__form">
                                    <Input
                                        placeholder="Họ tên"
                                        onChange={e => handleChange("fullName", e.target.value)}
                                    />
                                    <Input
                                        placeholder="SĐT"
                                        onChange={e => handleChange("phone", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Địa chỉ"
                                        onChange={e => handleChange("address", e.target.value)}
                                    />
                                </div>

                                <Divider />

                                <Radio.Group
                                    defaultValue="cod"
                                    className="checkout__payment"
                                    onChange={e => handleChange("paymentMethod", e.target.value)}
                                >
                                    <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                                    <Radio value="bank">Chuyển khoản</Radio>
                                </Radio.Group>

                                <Button
                                    type="primary"
                                    block
                                    className="checkout__btn"
                                    onClick={handleOrder}
                                >
                                    Đặt hàng
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Checkout;