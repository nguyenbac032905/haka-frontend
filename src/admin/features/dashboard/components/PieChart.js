import {Pie} from "@ant-design/charts";
import { Card } from "antd";
function PieChart(props){
    const {orders} = props;
    //pieChart
    const getStatusLabel = (status) => {
         switch (status) {
            case "initial": return "Đang xử lý";
            case "pending": return "Đang giao";
            case "delivered": return "Đã giao";
            case "cancelled": return "Đã hủy";
            default: return "Khác";
        }
    }
    const statusMap = {};
    orders?.forEach(order => {
        const label = getStatusLabel(order.status);
        statusMap[label] = (statusMap[label] || 0) + 1;
    })
    const pieData = Object.keys(statusMap).map(key => ({
        type: key,
        value: statusMap[key]
    }))
    const total = pieData.reduce((sum, i) => sum + i.value, 0);
    const config = {
        data: pieData,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.6,
        height: 320,
        color: {
            "Đang xử lý": "#1677ff",
            "Đang giao": "#fa8c16",
            "Đã giao": "#52c41a",
            "Đã hủy": "#ff4d4f",
        },
        label: {
            text: (item) => {
                const percent = ((item.value / total) * 100).toFixed(0);
                return `${item.type} ${percent}%`;
            },
        },
        tooltip: {
            formatter: (item) => {
                const percent = ((item.value / total) * 100).toFixed(1);
                return {
                    name: item.type,
                    value: `${item.value} (${percent}%)`,
                };
            },
        },

        legend: {
            position: "bottom",
        },
    };
    return (
        <>
            <Card title="Tỷ lệ trạng thái đơn">
                <Pie {...config} />
            </Card>
        </>
    )
}
export default PieChart