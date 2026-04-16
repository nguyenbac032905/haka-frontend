import { Form, Input, Button, Select, Upload, Card} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {useCategories} from "../../product-category/hooks/useCategories";
import { buildCategorySelectOptions, buildCategoryTree } from "../../../../shared/helpers/createTree";
import { useCreateCategory } from "../hooks/useCreateCategory";

const { TextArea } = Input;

function CategoryCreate() {
    //xu li phan categories
    const {categories} = useCategories();
    const categoriesTree = buildCategoryTree(categories);
    const categoriesSelect = buildCategorySelectOptions(categoriesTree);
    const {handleCreate,loading} = useCreateCategory();
    return (
        <Card title="Tạo danh mục">
            <Form
                layout="vertical"
                onFinish={handleCreate}
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
                    <Button type="primary" htmlType="submit" loading={loading}>Tạo danh mục</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default CategoryCreate;