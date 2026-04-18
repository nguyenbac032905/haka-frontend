import { useEffect, useState } from "react";
import { getListProduct } from "../api/productService";

export function useProducts(){
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

     const fetchApi = async () => {
        setLoading(true);
        try{
            const products = await getListProduct();
            setProducts(products);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
    },[]);
    return {products,loading,refetch: fetchApi}
}