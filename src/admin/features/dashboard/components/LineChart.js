import { Line } from "@ant-design/charts";
import { useState, useMemo } from "react";
import { Card, Select } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
function LineChart(props) {
    const [timeRange, setTimeRange] = useState("year");
    const [dateRange, setDateRange] = useState(null);
    const {orders,items} = props;
     //loc order khi nguoi dung chon select
    const filteredOrders = useMemo(() => {
        // nếu user chọn khoảng ngày
        if (dateRange && dateRange.length === 2) {
            const [start, end] = dateRange;

            return orders.filter(o => {
                const d = new Date(o.createdAt);
                return d >= start.startOf("day").toDate() &&
                    d <= end.endOf("day").toDate();
            });
        }
        // nếu chưa chọn thì dùng week/month/year
        const now = new Date();

        const start = new Date();

        if (timeRange === "week") {
            start.setDate(now.getDate() - 6);
        }

        if (timeRange === "month") {
            start.setDate(now.getDate() - 29);
        }

        if (timeRange === "year") {
            start.setFullYear(now.getFullYear() - 1);
        }

        return orders.filter(o => {
            const d = new Date(o.createdAt);
            return d >= start && d <= now;
        });
    }, [orders, timeRange,dateRange]);
    //tao dataline chart
    const chartData = useMemo(() => {
        const map = {};

        filteredOrders.forEach(order => {
            if (
                order.status !== "delivered" ||
                order.paymentStatus !== "paid"
            ) return;

            const dateObj = new Date(order.createdAt);

            let key;
            let sortKey;

            if (timeRange === "year") {
                key = `Th${dateObj.getMonth() + 1}`;
                sortKey = dateObj.getFullYear() * 100 + (dateObj.getMonth() + 1);
            } else {
                key = dateObj.toLocaleDateString("vi-VN");
                sortKey = dateObj.getTime();
            }

            if (!map[key]) {
                map[key] = {
                    date: key,
                    revenue: 0,
                    sortKey
                };
            }

            const orderItems = items.filter(
                i => Number(i.order_id) === Number(order.id)
            );

            orderItems.forEach(item => {
                const discount = item.price * (item.discountPercentage / 100);
                const finalPrice = item.price - discount;

                map[key].revenue += finalPrice * item.quantity;
            });
        });

        return Object.values(map)
            .sort((a, b) => a.sortKey - b.sortKey)
            .map(({ date, revenue }) => ({ date, revenue }));
    }, [filteredOrders, items, timeRange]);
    //cau hinh cho line chart
    const config = {
        data: chartData,
        xField: "date",
        yField: "revenue",
        smooth: true,
        height: 320,
        color: "#3f8600",
        point: {
            size: 4
        },
        tooltip: {
            showMarkers: true
        }
    };
    return(
        <>
            <Card
                title="Doanh thu theo thời gian"
                extra={
                    <Space>
                        <RangePicker
                            onChange={(dates) => setDateRange(dates)}
                            format="DD/MM/YYYY"
                        />

                        <Select
                            value={timeRange}
                            onChange={(value) => {
                                setTimeRange(value);
                                setDateRange(null);
                            }}
                            style={{ width: 140 }}
                            options={[
                                { value: "week", label: "Theo tuần" },
                                { value: "month", label: "Theo tháng" },
                                { value: "year", label: "Theo năm" }
                            ]}
                        />
                    </Space>
                }
            >
                <Line {...config} />
            </Card>
        </>
    )
}
export default LineChart