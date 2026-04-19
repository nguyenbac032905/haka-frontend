import { useState,useMemo } from "react";
import { Table, Input, Select, Button, Space, Image, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useProducts } from "../hooks/useProducts";
import { useUpdateProductField } from "../hooks/useUpdateProductField";
import { Link } from "react-router-dom";

function Product() {
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const {products,loading,refetch} = useProducts();
    const { handleUpdateField, loadingId : loadingStatus} = useUpdateProductField();
    

    // ===== filter data =====
    const filteredData = useMemo(() => {
        return products.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(searchText.toLowerCase());

            const matchStatus = statusFilter
                ? item.status === statusFilter
                : true;

            return matchSearch && matchStatus;
        });
    },[products,searchText,statusFilter]);
    
    // ===== columns =====
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Ảnh",
            dataIndex: "thumbnail",
            render: (img) => <Image width={50} src={img} />
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title)
        },
        {
            title: "Giá",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            render: (price) =>
                price.toLocaleString("vi-VN") + " đ"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status,record) => (
                <Button
                    loading={loadingStatus === record.id}
                    disabled={loadingStatus === record.id}
                    type="primary"
                    danger={status === "inactive"}
                    style={{width: 100,height: 32 }}
                    onClick={async () => {
                            const newStatus = status === "active" ? "inactive" : "active";
                            const success = await handleUpdateField(record.id,"status",newStatus);
                            if(success){
                                refetch();
                            }
                        }
                    }
                >
                    {status === "active" ? "Active" : "Inactive"}
                </Button>
            )
        },
        {
            title: "Hành động",
            key: "action",
            render: (_,record) => (
                <Space>
                    <Link to={`/admin/products/detail/${record.id}`}><Button type="primary">Chi tiết</Button></Link>
                    <Link to={`/admin/products/edit/${record.id}`} state={{name: record.title}}><Button>Sửa</Button></Link>
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
                            loading={loadingStatus === record.id}
                            disabled={loadingStatus === record.id}
                        >Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 16 }}>
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Danh sách sản phẩm</h2>
            </div>

            {/* FILTER */}
            <Space style={{ marginBottom: 30 }}>
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
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
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" }
                    ]}
                />
            </Space>

            {/* TABLE */}
            <Table
                loading={loading}
                rowKey="id"
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current,size) => {
                        setPageSize(size)
                    }
                }}
            />
        </div>
    );
}

export default Product;