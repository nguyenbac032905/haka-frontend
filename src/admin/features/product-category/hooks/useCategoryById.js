import { useEffect, useState } from "react";
import { getCategory } from "../api/product-categoryService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useCategoryById(idCategory) {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    useEffect(() => {
        if (!idCategory) return;

        const fetchCategory = async () => {
            setLoading(true);

            try {
                const result = await getCategory(idCategory);

                if (!result || result.deleted) {
                    message.error("Không tìm thấy danh mục sản phẩm");
                    redirect("/admin/product-categories");
                    return;
                }

                setCategory(result);
            } catch (err) {
                message.error("Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [idCategory]);

    return { category, loading };
}