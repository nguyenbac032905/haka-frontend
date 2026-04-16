import { useState } from "react";
import { message } from "antd";
import { uploadImage } from "../../../../shared/helpers/uploadCloudinary";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { editCategory } from "../api/product-categoryService";

export function useEditCategory() {
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    const handleEdit = async (idCategory,values) => {
        setLoading(true);

        try {
            const file = values.thumbnail?.[0];
            
            let thumbnailUrl = file?.url;

            // nếu có file mới thì upload
            const realFile = file?.originFileObj;
            
            if (realFile instanceof File) {
                thumbnailUrl = await uploadImage(realFile);
            }

            const payload = {
                ...values,
                thumbnail: thumbnailUrl
            };
            
            const result = await editCategory(idCategory,payload);

            if (result?.id || result?.success) {
                message.success("Sửa thành công");
                redirect("/admin/product-category");
                return true;
            } else {
                message.error("Sửa thất bại");
                return false;
            }
        } catch (err) {
            message.error("Có lỗi xảy ra");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleEdit
    };
}