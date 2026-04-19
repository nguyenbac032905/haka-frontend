import { useState } from "react";
import { editProduct } from "../api/productService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useUpdateProductField() {
    const [loadingId, setLoadingId] = useState(null);
    const { redirect } = useRedirect();

    const handleUpdateField = async (idProduct, key, value) => {
        setLoadingId(idProduct);

        try {
            const payload = {
                [key]: value
            };

            const result = await editProduct(idProduct, payload);

            if (result) {
                message.success("Cập nhật thành công");
                redirect("/admin/products");
                return true;
            } else {
                message.error("Cập nhật thất bại");
                return false;
            }
        } catch (error) {
            message.error("Có lỗi xảy ra");
            return false;
        } finally {
            setLoadingId(null);
        }
    };

    return { handleUpdateField, loadingId };
}