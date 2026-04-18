import { useEffect, useState } from "react";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { getCart } from "../api/cartService";

export function useCart(cartId) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    useEffect(() => {
        if (!cartId) return;

        const fetchCart = async () => {
            setLoading(true);

            try {
                const result = await getCart(cartId);

                if (!result) {
                    message.error("Không tìm thấy giỏ hàng");
                    redirect("/");
                    return;
                }

                setCart(result);
            } catch (err) {
                message.error("Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [cartId]);

    return { cart, loading };
}