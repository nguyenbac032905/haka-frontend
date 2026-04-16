import { useParams } from "react-router-dom";
import { useCategoryById } from "../hooks/useCategoryById";
import { Card, Col, Descriptions, Row, Spin, Tag,Image } from "antd";

function CategoryDetail() {
    const {id} = useParams();
    const {category, loading} = useCategoryById(id);
    const parentCategoryId = category?.parent_id;
    const {category: parentCategory} = useCategoryById(parentCategoryId);
    
    if(loading) {
        return(
            <div style={{textAlign: "center", marginBottom: 200}}>
                <Spin size="large"/>
            </div>
        )
    }
    if(!category){
        return <div>Không tìm thấy danh mục</div>
    }
    return (
        <Row gutter={20} style={{padding: 20}}>
            <Col span={8}>
                <Card>
                    <Image src={category.thumbnail} width="100%"/>
                </Card>
            </Col>
            <Col span={16}>
                <Card title="Chi tiết danh mục">
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Tên danh mục">
                            {category.title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh mục cha">
                            {parentCategory?.title || "Không có danh mục cha"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            {category.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={category.status == "active" ? "green" : "red"}>{category.status === "active" ? "Active" : "Inactive"}</Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
        </Row>
    );
}

export default CategoryDetail;