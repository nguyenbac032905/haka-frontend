import { Button, Input, Space, Table, Tag, DatePicker, Select, Spin, Popconfirm } from "antd";
import {useOrders} from "../hooks/useOrder";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import {useUpdateOrderField} from "../hooks/useUpdateOrderField";
const {RangePicker} = DatePicker;

 
function Order(){
    const {orders, loading,refetch} = useOrders();
    const [pageSize,setPageSize] = useState(3);
    const [statusFilter,setStatusFilter] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [dateRange,setDateRange] = useState([]);
    const {handleUpdateField,loadingId} = useUpdateOrderField();
    //filter
    const filteredData = useMemo(() => {
        return orders.filter(item => {
            const searchMatch = item.fullName.toLowerCase().includes(searchText.toLowerCase());
            const matchStatus = statusFilter ? item.status === statusFilter : true;
            if(!dateRange || dateRange.length === 0) return searchMatch && matchStatus

            const orderDate = new Date(item.createdAt).getTime();
            const from = dateRange[0]?.startOf("day").valueOf();
            const to = dateRange[1]?.endOf("day").valueOf();
            const matchDate = orderDate >= from && orderDate <= to;
            return searchMatch && matchDate;
        })
    },[searchText,orders,dateRange,statusFilter]);
    //xu li phan status
    const statusOptions = [
        { value: "initial", label: "Chờ lấy hàng", color: "red" },
        { value: "pending", label: "Đang giao hàng", color: "orange" },
        { value: "delivered", label: "Đã giao", color: "green" },
        { value: "cancelled", label: "Đã hủy", color: "default" }
    ];
    const getAvailableStatus = (current) => {
        switch (current) {
            case "initial":
                return ["initial", "pending", "cancelled"];

            case "pending":
                return ["pending", "delivered", "cancelled"];

            case "delivered":
                return ["delivered"];

            case "cancelled":
                return ["cancelled"];

            default:
                return [];
        }
    };
    //định nghĩa cột
    const columns = [
        {
            title: "Số thứ tự",
            key: "index",
            render: (_,__,index) => index + 1
        },
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            sorter: (a,b) => a.fullName.localeCompare(b.fullName)
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status,record) => {
                const available = getAvailableStatus(status);
                return(
                    <Select
                        loading={loadingId === record.id}
                        disabled={loadingId === record.id}
                        value={status}
                        style={{width: 160}}
                        onChange={async (value) => {
                            const success = await handleUpdateField(record.id,"status",value);
                            if(success){
                                refetch();
                            }
                        }}
                        options={
                            statusOptions.filter(opt => available.includes(opt.value)).map(opt => ({
                                value: opt.value,
                                label: (
                                    <div style={{ width: 140 }}>
                                        <Tag
                                            color={opt.color}
                                            style={{ width: "100%"}}
                                        >
                                            {opt.label}
                                        </Tag>
                                    </div>
                                )
                            }))
                        }
                    >

                    </Select>
                )
            }
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            render: (paymentMethod) => paymentMethod === "cod" ? "Trực tiếp" : "Online"
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "paymentStatus",
            render: (paymentStatus) => <Tag color={paymentStatus === "paid" ? "green" : "red"}>{paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</Tag>
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (createdAt) => {
                const date = new Date(createdAt);

                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <CalendarOutlined style={{ color: "#1890ff" }} />
                        <span>
                            {date.toLocaleDateString("vi-VN")}{" "}
                            <span style={{ color: "#888" }}>
                                {date.toLocaleTimeString("vi-VN")}
                            </span>
                        </span>
                    </div>
                );
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Link to={`/admin/orders/detail/${record.id}`}><Button type="primary">Chi tiết</Button></Link>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc chắn muốn xóa không?"
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{danger: true}}
                        onConfirm={async () => {
                            const result = await handleUpdateField(record.id,"deleted",true);
                            if(result){
                                refetch();
                            }
                        }}
                    >
                        <Button danger
                            loading={loadingId === record.id}
                            disabled={loadingId === record.id}
                        >Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }

    ];
    if(loading){
        return <div style={{textAlign: "center",marginTop: 200}}>
            <Spin size="large" />
        </div>
    }
    return(
        <>
            <div style={{padding: 16}}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <h2>Danh sách đơn hàng</h2>
                </div>

                <Space style={{marginBottom: 30}}>
                    <Input
                        placeholder="Tìm kiếm tên người dùng..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Lọc trạng thái"
                        style={{ width: 180 }}
                        allowClear
                        onChange={(value) => setStatusFilter(value)}
                        options={[
                            { value: "", label: "Tất cả" },
                            { value: "initial", label: "Chờ lấy hàng" },
                            { value: "pending", label: "Đang giao hàng" },
                            { value: "delivered", label: "Đã giao" }
                        ]}
                    />
                    <RangePicker
                        onChange={(dates) => setDateRange(dates)}
                        format="DD/MM/YYYY"
                    />
                </Space>

                <Table
                    dataSource={filteredData}
                    rowKey="id"
                    columns={columns}
                    pagination={{
                        pageSize: pageSize,
                        showSizeChanger: true,
                        onShowSizeChange: (current,size) => {
                            setPageSize(size)
                        }
                    }}
                >

                </Table>
            </div>
        </>
    )
};
export default Order;