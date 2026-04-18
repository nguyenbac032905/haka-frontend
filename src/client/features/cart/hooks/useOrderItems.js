import { useEffect, useState } from "react";
import { getOrderDetailByOrderId } from "../api/orderItemService";

export const useOrderItems = (orderId) => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrderItems = async () => {
        if (!orderId) return;

        setLoading(true);
        try {
            const res = await getOrderDetailByOrderId(orderId);
            setOrderItems(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderItems();
    }, [orderId]);

    return {
        orderItems,
        loading,
        error,
        refetch: fetchOrderItems
    };
};