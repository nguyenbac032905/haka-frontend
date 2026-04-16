import { useEffect, useState } from "react"
import { getOrders } from "../api/orderService";

export function useOrders(){
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const fetchApi = async () => {
        setLoading(true);
        try{
            const result = await getOrders();
            setOrders(result);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
    },[])
    return {orders, loading, refetch: fetchApi}
}