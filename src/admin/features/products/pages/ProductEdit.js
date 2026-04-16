import { Form, Input, InputNumber, Button, Select, Upload, Card, Spin} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {useCategories} from "../../product-category/hooks/useCategories";
import { buildCategorySelectOptions, buildCategoryTree } from "../../../../shared/helpers/createTree";
import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProductById";
import { useEditProduct } from "../hooks/useEditProduct";
import { useEffect } from "react";

const { TextArea } = Input;

function ProductEdit() {
    const [form] = Form.useForm();
    const {id} = useParams();
    //ham sua san pham
    const {loading, handleEdit} = useEditProduct();
    //xu li phan categories
    const {categories} = useCategories();
    const categoriesTree = buildCategoryTree(categories);
    const categoriesSelect = buildCategorySelectOptions(categoriesTree);
    //lay du lieu product
    const {product,loading: loadingProduct} = useProductById(id);

    //do du lieu ra form
    useEffect(() => {
        if(product){
            form.setFieldsValue({
                ...product,
                product_category_id: String(product.product_category_id),
                thumbnail: product.thumbnail?[{url: product.thumbnail}]:[]
            });
        }
    },[product,form])

    if(loadingProduct){
        return(
            <div style={{ textAlign: "center", marginTop: 50 }}>
                <Spin size="large" />
            </div>
        )
    }
    if(!product){
        return(
            <div>Không tìm thấy sản phẩm</div>
        )
    }
    return (
        <Card title="Sửa sản phẩm">
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => handleEdit(product.id,values)}
                initialValues={{
                    status: "active"
                }}
            >
                <Form.Item
                    name="title"
                    label="Tên sản phẩm"
                    rules={[{required: true, message: "Vui lòng nhập tiêu đề"}]}
                >
                    <Input placeholder="Nhập tên sản phẩm..." />
                </Form.Item>
                <Form.Item
                    name="product_category_id"
                    label="Danh mục"
                    rules={[{ required: true, message: "Chọn danh mục" }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        options={categoriesSelect}
                    />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{required: true, message: "Vui lòng nhập giá"}]}
                >
                    <InputNumber placeholder="Nhập giá sản phẩm..." style={{width: "100%"}} min={0}/>
                </Form.Item>
                <Form.Item
                    label="Giảm giá"
                    name="discountPercentage"
                >
                    <InputNumber placeholder="Nhập giảm giá sản phẩm..." style={{width: "100%"}} min={0} max={100}/>
                </Form.Item>
                <Form.Item
                    label="Số lượng còn lại"
                    name="stock"
                >
                    <InputNumber placeholder="Nhập số lượng sản phẩm..." style={{width: "100%"}} min={0}/>
                </Form.Item>
                <Form.Item label="Trạng thái" name="status">
                    <Select
                        options={[
                            {label: "Active",value:"active"},
                            {label: "Inactive",value:"inactive"}
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <TextArea rows={4} placeholder="Nhập mô tả..." />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                    <TextArea rows={4} placeholder="Nhập nội dung..." />
                </Form.Item>
                <Form.Item 
                    label="Ảnh"
                    name="thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Cập nhật</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ProductEdit;