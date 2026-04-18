import { useEffect, useState } from "react";
import { getListCategory } from "../api/categoryService";

export const useCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const fetchApi = async () => {
        setLoading(true);
        try {
            const result = await getListCategory();
            setCategories(result);
        }finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);
    return { categories, loading,refetch: fetchApi };
};