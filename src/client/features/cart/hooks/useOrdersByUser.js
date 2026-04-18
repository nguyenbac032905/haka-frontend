import { useEffect, useState } from "react";
import { getListOrderByUser } from "../api/orderService";

export const useOrdersByUser = (userId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const res = await getListOrderByUser(userId);
            setOrders(res); // nếu API trả về {data: []} thì dùng res.data
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders
    };
};