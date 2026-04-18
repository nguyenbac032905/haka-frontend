import { getCookie } from "../../../../shared/helpers/cookie";
import { useOrdersByUser } from "../hooks/useOrdersByUser";
import { Card, Typography, Tag, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import "./myOrder.scss";

const { Text } = Typography;

function MyOrder() {
    const userId = getCookie("userId");
    const { orders, loading } = useOrdersByUser(userId);
    const navigate = useNavigate();

    if (loading) return <Spin />;

    const renderStatusTag = (status) => {
        switch (status) {
            case "initial":
                return <Tag color="blue">Chờ xác nhận</Tag>;
            case "pending":
                return <Tag color="orange">Đang xử lý</Tag>;
            case "delivered":
                return <Tag color="green">Hoàn thành</Tag>;
            case "cancelled":
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const renderPaymentTag = (status) => {
        switch (status) {
            case "pending":
                return <Tag color="orange">Chưa thanh toán</Tag>;
            case "paid":
                return <Tag color="green">Đã thanh toán</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    return (
    <div className="my-order">
        <div className="container">
            <div className="my-order__wrapper">
                <h2 className="my-order__title">📦 Đơn hàng của tôi</h2>

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="order-card"
                        onClick={() => navigate(`/success/${order.id}`)}
                    >
                        {/* Header */}
                        <div className="order-card__header">
                            <div>
                                <span className="label">Mã đơn:</span>
                                <span className="value">{order.id}</span>
                            </div>

                            <div className="order-card__status">
                                {renderStatusTag(order.status)}
                                {renderPaymentTag(order.paymentStatus)}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="order-card__body">
                            <div>
                                <span className="label">Người nhận:</span>
                                <span className="value">{order.fullName}</span>
                            </div>

                            <div>
                                <span className="label">SĐT:</span>
                                <span className="value">{order.phone}</span>
                            </div>

                            <div>
                                <span className="label">Địa chỉ:</span>
                                <span className="value">{order.address}</span>
                            </div>

                            <div>
                                <span className="label">Thanh toán:</span>
                                <span className="value">
                                    {order.paymentMethod}
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="order-card__footer">
                            <span>
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default MyOrder;