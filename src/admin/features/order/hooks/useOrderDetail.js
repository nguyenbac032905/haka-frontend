import { useEffect, useState } from "react";
import { getOrderDetailByOrderId } from "../api/orderDetailService";

export function useOrderDetail(orderId) {
    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        const fetchApi = async () => {
            setLoading(true);
            try{
                const res = await getOrderDetailByOrderId(orderId);
                setItems(res);
            }finally{
                setLoading(false);
            }
        };

        fetchApi();
    }, [orderId]);

    return {items,loading};
}