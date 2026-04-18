import { useState } from "react";
import { message } from "antd";
import { createOrderItem } from "../api/orderItemService";

export const useCreateOrderItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateOrderItems = async (items, orderId) => {
        try {
            setLoading(true);
            setError(null);

            await Promise.all(
                items.map(item => {
                    return createOrderItem({
                        order_id: orderId,
                        product_id: item.product_id,
                        price: item.price,
                        quantity: item.quantity,
                        discountPercentage: item.discountPercentage
                    });
                })
            );

            return true;
        } catch (err) {
            console.error(err);
            setError(err);
            message.error("Tạo chi tiết đơn hàng thất bại!");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        handleCreateOrderItems,
        loading,
        error
    };
};