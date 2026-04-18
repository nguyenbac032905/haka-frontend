import { useEffect, useState } from "react";
import { getOrder } from "../api/orderService";

export const useOrderById = (orderId) => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const res = await getOrder(orderId);
            setOrder(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    return {
        order,
        loading,
        error,
        refetch: fetchOrder
    };
};