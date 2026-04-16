import { useEffect, useState } from "react";
import { getOrdersDetail } from "../api/orderDetailService";

export function useOrdersDetail() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await getOrdersDetail();
                setItems(Array.isArray(res) ? res : []);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, []);

    return { items, loading };
}