import { useParams } from "react-router-dom";
import { useOrderById } from "../hooks/useOrderById";
import { useOrderItems } from "../hooks/useOrderItems";
import { Card, Typography, Tag, Table, Row, Col, Spin } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./success.scss";

const { Title, Text } = Typography;

function Success() {
    const { orderId } = useParams();
    const { order, loading: loadingOrder } = useOrderById(orderId);
    const { orderItems, loading: loadingItems } = useOrderItems(orderId);

    if (loadingOrder || loadingItems) return <Spin />;

    const renderStatusTag = (status) => {
        switch (status) {
            case "initial":
                return <Tag color="blue">Chờ lấy hàng</Tag>;
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

    const totalPrice = orderItems.reduce((sum, item) => {
        const priceAfterDiscount =
            item.price * (1 - item.discountPercentage / 100);
        return sum + priceAfterDiscount * item.quantity;
    }, 0);

    const columns = [
        {
            title: "Giá",
            dataIndex: "price",
            render: (price) => price.toLocaleString() + " đ",
        },
        {
            title: "SL",
            dataIndex: "quantity",
        },
        {
            title: "Thành tiền",
            render: (_, item) => {
                const final =
                    item.price *
                    (1 - item.discountPercentage / 100) *
                    item.quantity;
                return final.toLocaleString() + " đ";
            },
        },
    ];

    return (
        <div className="success">
            <div className="container">
                {/* Header */}
                <div className="success__header">
                    <CheckCircleOutlined className="icon" />
                    <div>
                        <Title level={3}>Đặt hàng thành công</Title>
                        <Text>Mã đơn: {order.id}</Text>
                    </div>
                </div>

                <Row gutter={20}>
                    {/* LEFT */}
                    <Col span={16}>
                        <Card className="success__card" title="Thông tin đơn hàng">
                            <div className="info-grid">
                                <div>
                                    <span>Khách hàng</span>
                                    <b>{order.fullName}</b>
                                </div>
                                <div>
                                    <span>SĐT</span>
                                    <b>{order.phone}</b>
                                </div>
                                <div>
                                    <span>Địa chỉ</span>
                                    <b>{order.address}</b>
                                </div>
                                <div>
                                    <span>Thanh toán</span>
                                    <b>{order.paymentMethod}</b>
                                </div>
                                <div>
                                    <span>Ngày</span>
                                    <b>{new Date(order.createdAt).toLocaleString()}</b>
                                </div>
                                <div>
                                    <span>Trạng thái đơn hàng</span>
                                    <div>
                                        {renderStatusTag(order.status)}
                                    </div>
                                </div>
                                <div>
                                    <span>Trạng thái thanh toán</span>
                                    <div>
                                        {renderPaymentTag(order.paymentStatus)}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="success__card" title="Sản phẩm">
                            <Table
                                dataSource={orderItems}
                                columns={columns}
                                pagination={false}
                                rowKey="id"
                            />
                        </Card>
                    </Col>

                    {/* RIGHT */}
                    <Col span={8}>
                        <Card className="success__summary">
                            <Title level={4}>Tổng đơn</Title>

                            <div className="summary-row">
                                <span>Tạm tính</span>
                                <span>{totalPrice.toLocaleString()} đ</span>
                            </div>

                            <div className="summary-row total">
                                <span>Tổng tiền</span>
                                <span>{totalPrice.toLocaleString()} đ</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Success;