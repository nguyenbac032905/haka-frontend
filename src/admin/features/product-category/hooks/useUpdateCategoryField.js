import { useState } from "react";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { editCategory } from "../api/product-categoryService";

export function useUpdateCategoryField() {
    const [loadingId, setLoadingId] = useState(null);
    const { redirect } = useRedirect();

    const handleUpdateField = async (idCategory, key, value) => {
        setLoadingId(idCategory);

        try {
            const payload = {
                [key]: value
            };

            const result = await editCategory(idCategory, payload);

            if (result) {
                message.success("Cập nhật thành công");
                redirect("/admin/product-category");
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