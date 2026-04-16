import { Button, Image, Input, message, Popconfirm, Select, Space, Spin, Table } from "antd";
import { useCategories } from "../hooks/useCategories";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { buildCategoryTree,getSubCategoryId,findCategoryInTree, getAllParents } from "../../../../shared/helpers/createTree";
import {useUpdateCategoryField} from "../hooks/useUpdateCategoryField";

function Category(){
    const {categories, loading, refetch} = useCategories();
    const [pageSize, setPageSize] = useState(3);
    const [searchText, setSearchText] = useState("");
    const [statusFilter,setStatusFilter] = useState(null);
    const {handleUpdateField, loadingId} = useUpdateCategoryField();

    const treeData = useMemo(() => {
        const filtered = categories.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(searchText.toLowerCase());

            const matchStatus = statusFilter
                ? item.status === statusFilter
                : true;

            return matchSearch && matchStatus;
        });
        return buildCategoryTree(filtered);
    }, [categories, searchText, statusFilter]);
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_,__,index) => index+1
        },
        {
            title: "Ảnh",
            dataIndex: "thumbnail",
            render: (img) => <Image src={img} width={50} />
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            sorter: (a,b) => a.title.localeCompare(b.title)
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status,record) => {
                return <Button
                    loading={loadingId === record.id}
                    disabled={loadingId === record.id}
                    type="primary"
                    danger={status === "inactive"}
                    style={{width: 100,height: 32 }}
                    onClick={async () => {
                        const category = findCategoryInTree(treeData,record.id);
                        const allCategoryIds = getSubCategoryId(category);

                        const newStatus = status === "active" ? "inactive" : "active";

                        const allParentCategory = getAllParents(treeData,record.id);
                        const hasInactiveParent = allParentCategory.some(p => p.status === "inactive");
                        if(hasInactiveParent && newStatus === "active"){
                            message.error("Danh mục cha đang dừng hoạt động nên không thể kích hoạt");
                            return;
                        }
                        
                        await Promise.all(allCategoryIds.map(id => handleUpdateField(id,"status", newStatus)))
                        refetch();
                    }}
                >
                    {status == "active" ? "Active" : "Inactive"}
                </Button>
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (_,record) => {
                return <Space>
                    <Link to={`/admin/product-category/detail/${record.id}`}><Button type="primary">Chi tiết</Button></Link>
                    <Link to={`/admin/product-category/edit/${record.id}`}><Button>Sửa</Button></Link>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc muốn xóa danh mục này và tất cả danh mục con?"
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{danger: true}}
                        onConfirm={async () => {
                            const category = findCategoryInTree(treeData,record.id);
                            const allCategoryIds = getSubCategoryId(category);
                            await Promise.all(
                                allCategoryIds.map(id => handleUpdateField(id,"deleted",true))
                            )
                            refetch();
                        }}
                    >
                        <Button 
                            danger 
                            loading={loadingId === record.id}
                            disabled={loadingId === record.id}
                        >Xóa</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ];
    if(loading){
        return(
            <div style={{textAlign:"center",marginTop: 200}}>
                <Spin size="large" />
            </div>
        )
    }
    return(
        <>
            <div style={{padding: 16}}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <h2>Danh sách danh mục</h2>
                </div>
                <Space style={{marginBottom: 30}}>
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
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={treeData}
                    pagination={{
                        pageSize: pageSize,
                        showSizeChanger: true,
                        onShowSizeChange: (current,size) => setPageSize(size)
                    }}
                    expandable={{
                        defaultExpandedRowKeys: treeData.length ? [treeData[0].id] : []
                    }}
                >
                </Table>
            </div>
        </>
    )
}
export default Category;