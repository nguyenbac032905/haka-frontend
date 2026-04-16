import { Form, Input, Button, Select, Upload, Card} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {useCategories} from "../../product-category/hooks/useCategories";
import { buildCategorySelectOptions, buildCategoryTree } from "../../../../shared/helpers/createTree";
import { useParams } from "react-router-dom";
import { useCategoryById } from "../hooks/useCategoryById";
import { useEffect } from "react";
import { useEditCategory } from "../hooks/useEditCategory";

const { TextArea } = Input;

function CategoryEdit() {
    const [form] = Form.useForm();
    const {id} = useParams();
    const {category,loading} = useCategoryById(id);
    useEffect(() => {
        if(category){
            form.setFieldsValue({
                ...category,
                parent_id: String(category.parent_id),
                thumbnail: category.thumbnail?[{url: category.thumbnail}]:[]
            })
        }
    },[category,form]);
    //xu li phan chon categories
    const {categories} = useCategories();
    const categoriesTree = buildCategoryTree(categories);
    const categoriesSelect = buildCategorySelectOptions(categoriesTree);
    const {handleEdit, loading: loadingEdit} = useEditCategory();
    return (
        <Card title="Tạo danh mục">
            <Form
                loading={loading}
                layout="vertical"
                form={form}
                onFinish={(values) => handleEdit(category.id,values)}
                initialValues={{
                    status: "active"
                }}
            >
                <Form.Item
                    name="title"
                    label="Tên danh mục"
                    rules={[{required: true, message: "Vui lòng nhập tiêu đề"}]}
                >
                    <Input placeholder="Nhập tên sản phẩm..." />
                </Form.Item>
                <Form.Item
                    name="parent_id"
                    label="Danh mục cha"
                    rules={[{ required: true, message: "Chọn danh mục cha" }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        options={categoriesSelect}
                    />
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
                    <Button type="primary" htmlType="submit" loading={loadingEdit}>Cập nhật</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default CategoryEdit;