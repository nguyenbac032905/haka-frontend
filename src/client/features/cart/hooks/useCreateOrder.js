import { useState } from "react";
import { message } from "antd";
import { createOrder } from "../api/orderService";

export const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateOrder = async (orderData) => {
        try {
            setLoading(true);
            setError(null);
            // 1. tạo order
            const order = await createOrder(orderData);
            message.success("Đặt hàng thành công!");
            return order;

        } catch (err) {
            console.error(err);
            setError(err);
            message.error("Đặt hàng thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleCreateOrder,
        loading,
        error
    };
};