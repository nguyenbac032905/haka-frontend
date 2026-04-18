import { useState } from "react";
import { editOrder } from "../api/orderService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useUpdateOrderField() {
    const [loadingId, setLoadingId] = useState(null);
    const { redirect } = useRedirect();

    const handleUpdateField = async (idOrder, key, value) => {
        setLoadingId(idOrder);

        try {
            const payload = {
                [key]: value
            };
            
            const result = await editOrder(idOrder, payload);

            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        } finally {
            setLoadingId(null);
        }
    };

    return { handleUpdateField, loadingId };
}