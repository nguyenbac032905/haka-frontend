import {Col,Statistic, Card} from "antd";
import { ShoppingCartOutlined, DollarOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
function KPISection(props){
    const {orders,items} = props;
    //row box
    const totalOrders = orders?.length || 0;
    const deliveredOrders = orders?.filter(o => o.status === "delivered").length || 0;
    const cancelledOrders = orders?.filter(o => o.status === "cancelled").length || 0;
    const successOrderIds = orders ?.filter(o => (o.paymentStatus === "paid") && (o.status !== "cancelled")).map(o => Number(o.id)) || [];
    const totalRevenue = items.reduce((sum, item) => {
        if (successOrderIds.includes(Number(item.order_id))) {
            const discount = item.price * (item.discountPercentage / 100);
            const finalPrice = item.price - discount;
            return sum + finalPrice * item.quantity;
        }
        return sum
    }, 0);
    return (
        <>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="Tổng doanh thu"
                        value={totalRevenue}
                        precision={0}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<DollarOutlined />}
                        formatter={(value) =>
                            Number(value).toLocaleString("vi-VN") + " đ"
                        }
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="Tổng đơn hàng"
                        value={totalOrders}
                        valueStyle={{ color: "#1890ff" }}
                        prefix={<ShoppingCartOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="Đã giao"
                        value={deliveredOrders}
                        valueStyle={{ color: "#52c41a" }}
                        prefix={<CheckCircleOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="Đã hủy"
                        value={cancelledOrders}
                        valueStyle={{ color: "#ff4d4f" }}
                        prefix={<CloseCircleOutlined />}
                    />
                </Card>
            </Col>
        </>
    )
}
export default KPISection