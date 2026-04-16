import { useOrders } from "../hooks/useOrder";
import { useOrdersDetail } from "../hooks/useOrdersDetail";
import {Row,Col,Spin} from "antd";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import KPISection from "../components/KPISection";
import TopProductSlider from "../components/TopProductSlider";
import TopRevenueChart from "../components/TopRevenueChart";

function Dashboard(){
    const { orders, loading: loadingOrders } = useOrders();
    const { items, loading: loadingItems } = useOrdersDetail();
    if (loadingOrders || loadingItems) {
        return (
            <div style={{ textAlign: "center", marginTop: 200 }}>
                <Spin size="large" />
            </div>
        );
    }
    return(
        <>
            <div style={{padding: 20}}>
                <Row gutter={[16, 16]} style={{marginBottom: 30}}>
                    <KPISection orders={orders} items={items}/>
                </Row>
                <Row gutter={20} style={{marginBottom: 30}}>
                    <Col span={16}>
                        <LineChart orders={orders} items={items}/>
                    </Col>
                    <Col span={8}>
                        <PieChart orders={orders}/>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}><TopProductSlider /></Col>
                    <Col span={12}><TopRevenueChart orders={orders} items={items} /></Col>
                </Row>
            </div>
        </>
    )
}
export default Dashboard;