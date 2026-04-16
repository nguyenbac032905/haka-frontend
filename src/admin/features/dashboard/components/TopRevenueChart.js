import { Column } from "@ant-design/charts";
import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { Card } from "antd";

function TopRevenueChart(props) {
    const {orders, items} = props;
    const {products} = useProducts();
    const data = useMemo(() => {
        // 1. Lấy order hợp lệ
        const validOrderIds = orders.filter(o => o.status === "delivered" && o.paymentStatus === "paid").map(o => o.id);
        // 2. Lọc item thuộc order hợp lệ
        const validItems = items.filter(i =>
            validOrderIds.includes(String(i.order_id))
        );
        // 3. Tính doanh thu theo product
        const revenueMap = {};
        validItems.forEach(i => {
            const revenue = i.price *i.quantity *(1 - (i.discountPercentage || 0) / 100);

            if (!revenueMap[i.product_id]) {
                revenueMap[i.product_id] = 0;
            }

            revenueMap[i.product_id] += revenue;
        });
        // 4. convert + join product name
        return Object.entries(revenueMap).map(([productId, revenue]) => 
        {
            const product = products.find(p => p.id == productId);
            return {
                name: product?.title,
                revenue,
            };
        }).sort((a, b) => b.revenue - a.revenue).slice(0,5);
    }, [orders, items, products]);
    const config = {
        data,
        yField: "revenue",
        xField: "name",
        legend: false,

        label: {
        position: "right",
        formatter: (item) => {
            return item?.revenue
            ? item.revenue.toLocaleString("vi-VN") + "đ"
            : "";
        },
        },

        tooltip: {
        formatter: (item) => ({
            name: item.name,
            value: item.revenue?.toLocaleString("vi-VN") + "đ",
        }),
        },

        barStyle: {
            radius: [4, 4, 4, 4],
        },
        height: 290
    };

    return <Card title="Top 5 sản phẩm có doanh thu cao nhất"><Column {...config} /></Card>;
}

export default TopRevenueChart;