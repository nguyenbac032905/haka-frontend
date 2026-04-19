import { useState } from "react";
import { message } from "antd";
import { uploadImage } from "../../../../shared/helpers/uploadCloudinary";
import { editProduct } from "../api/productService";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import { createSlug } from "../../../../shared/helpers/createSlug";

export function useEditProduct() {
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    const handleEdit = async (idProduct,values) => {
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
                slug: createSlug(values.title),
                thumbnail: thumbnailUrl
            };

            
            delete payload.sold;
            console.log(payload)
            const result = await editProduct(idProduct,payload);
            console.log(result)

            if (result?.id || result?.success) {
                message.success("Sửa thành công");
                redirect("/admin/products");
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