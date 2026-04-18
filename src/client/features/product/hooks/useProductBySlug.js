import { useEffect, useState } from "react";
import { getProduct } from "../api/productService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useProductBySlug(slug) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            setLoading(true);

            try {
                const result = await getProduct(slug);

                if (!result || result.deleted) {
                    message.error("Không tìm thấy sản phẩm");
                    redirect("/");
                    return;
                }

                setProduct(result[0]);
            } catch (err) {
                message.error("Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    return { product, loading };
}