import { useEffect, useState } from "react";
import { getOrder } from "../api/orderService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useOrderById(idOrder) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    useEffect(() => {
        if (!idOrder) return;

        const fetchOrder = async () => {
            setLoading(true);

            try {
                const result = await getOrder(idOrder);

                if (!result || result.deleted) {
                    message.error("Không tìm thấy đơn hàng");
                    redirect("/admin/orders");
                    return;
                }

                setOrder(result);
            } catch (err) {
                message.error("Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [idOrder]);

    return { order, loading };
}