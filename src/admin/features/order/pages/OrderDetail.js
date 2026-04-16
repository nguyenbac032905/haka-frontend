import { useParams } from "react-router-dom";
import { useOrderById } from "../hooks/useOrderById";
import {useProducts} from "../../products/hooks/useProducts";
import { Card, Descriptions, Image, Spin, Table, Tag, Divider } from "antd";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { useMemo } from "react";

function OrderDetail(){
    const {id} = useParams();
    const {order, loading} = useOrderById(id);
    const {products,loading: loadingProduct} = useProducts();
    const {items,loading: loadingItem} = useOrderDetail(id);
    
    const mappedItems = useMemo(() => {
        if (!items.length || !products.length) return [];

        return items.map(item => {
            const product = products.find(p => p.id == item.product_id);
            console.log(product)
            return {
                ...item,
                title: product?.title || "Không có tên",
                thumbnail: product?.thumbnail || ""
            };
        });
    }, [items, products]);
    console.log(mappedItems)
    if (loading || loadingProduct || loadingItem) {
        return (
            <div style={{ textAlign: "center", marginTop: 200 }}>
                <Spin size="large" />
            </div>
        );
    }
    if(!order){
        return <div>Không tồn tại đơn hàng</div>
    }
    const total = mappedItems.reduce((sum, item) => {
        const newPrice = item.price*(1-item.discountPercentage/100);
        return sum + newPrice*item.quantity;
    },0);
    const columns = [
        {
            title: "Sản phẩm",
            render: (_, record) => (
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <Image 
                        src={record.thumbnail}
                        width={60}
                        height={80}
                        style={{objectFit: "cover", borderRadius: 8}}
                    />
                    <span style={{fontWeight: 500}}>{record.title}</span>
                </div>
            )
        },
        {
            title: "Giá",
            dataIndex: "price",
            render: (price) => price.toLocaleString("vi-VN") + " đ"
        },
        {
            title: "Số lượng",
            dataIndex: "quantity"
        },
        {
            title: "Thành tiền",
            key: "sum",
            render: (_, record) => {
                return (
                    (record.price * (1 - record.discountPercentage / 100))
                        .toLocaleString("vi-VN") + " đ"
                );
            }
        }
    ];
    return(
        <>
            <div style={{padding: 20}}>
                <Card title="Thông tin đơn hàng"style={{marginBottom: 20}}>
                    <Descriptions column={2} bordered>
                        <Descriptions.Item label="Khách hàng">{order.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{order.phone}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{order.address}</Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt">{new Date(order.createdAt).toLocaleString("vi-VN")}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag
                                color={ order.status === "initial" ? "red" : order.status === "pending" ? "orange" : order.status === "delivered" ? "green" : "default"}
                            >
                                {order.status === "initial" ? "Chờ lấy hàng" : order.status === "pending" ? "Đang giao hàng" : order.status === "delivered" ? "Đã giao" : "Đã hủy"}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title="Danh sách sản phẩm">
                    <Table
                        dataSource={mappedItems}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    >

                    </Table>
                    <Divider/>
                        <div style={{ textAlign: "right", fontSize: 18 }}>
                        <b>Tổng tiền: </b>
                        <span style={{ color: "#f5222d", fontSize: 20 }}>
                            {total.toLocaleString("vi-VN")} đ
                        </span>
                    </div>
                </Card>
            </div>
        </>
    )
}
export default OrderDetail