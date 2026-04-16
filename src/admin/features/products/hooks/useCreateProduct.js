import { useState } from "react";
import { message } from "antd";
import { uploadImage } from "../../../../shared/helpers/uploadCloudinary";
import { createProduct } from "../api/productService";
import { createSlug } from "../../../../shared/helpers/createSlug";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useCreateProduct() {
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    const handleCreate = async (values) => {
        setLoading(true);

        try {
            let thumbnailUrl = "";

            if (values.thumbnail && values.thumbnail.length > 0) {
                const file = values.thumbnail[0].originFileObj;
                thumbnailUrl = await uploadImage(file);
            }

            const payload = {
                ...values,
                thumbnail: thumbnailUrl,
                sold: 0,
                deleted: false,
                slug: createSlug(values.title)
            };

            const result = await createProduct(payload);

            if (result?.id || result?.success) {
                message.success("Tạo thành công");
                redirect("/admin/products");
                return true;
            } else {
                message.error("Tạo thất bại");
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
        handleCreate
    };
}