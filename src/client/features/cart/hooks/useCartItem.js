import { useEffect, useState } from "react";
import { getCartItemByCartId } from "../api/cartItemService";

export function useCartItem(cartId) {
    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if (!cartId) return;

        const fetchApi = async () => {
            setLoading(true);
            try{
                const res = await getCartItemByCartId(cartId);
                setItems(res);
            }finally{
                setLoading(false);
            }
        };

        fetchApi();
    }, [cartId]);

    return {items,loading};
}