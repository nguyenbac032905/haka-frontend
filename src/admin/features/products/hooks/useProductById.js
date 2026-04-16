import { useEffect, useState } from "react";
import { getProduct } from "../api/productService";
import { message } from "antd";
import { useRedirect } from "../../../../shared/hooks/useRedirect";

export function useProductById(idProduct) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { redirect } = useRedirect();

    useEffect(() => {
        if (!idProduct) return;

        const fetchProduct = async () => {
            setLoading(true);

            try {
                const result = await getProduct(idProduct);

                if (!result || result.deleted) {
                    message.error("Không tìm thấy sản phẩm");
                    redirect("/admin/products");
                    return;
                }

                setProduct(result);
            } catch (err) {
                message.error("Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [idProduct]);

    return { product, loading };
}