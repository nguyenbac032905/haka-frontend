import ProductDetail from "./pages/ProductDetail";
import ProductSearch from "./pages/ProductSearch";

export const productRoutes = [
    {
        path: "product/:slugProduct",
        element: <ProductDetail />
    },
    {
        path: "products",
        element: <ProductSearch />
    }
];