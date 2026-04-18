import { useEffect, useState } from "react";
import { getCategoryBySlug } from "../api/categoryService";

export const useCategoryBySlug = (slug) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchCategory = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getCategoryBySlug(slug);

                // json-server trả về mảng
                setCategory(res?.[0] || null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    return {
        category,
        loading,
        error
    };
};