import Product from "./pages/Product";
import ProductCreate from "./pages/ProductCreate";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";

const productRoutes = [
    {
        path: "products",
        element: <Product />,
    },
    {
        path: "products/create",
        element: <ProductCreate />
    },
    {
        path: "products/detail/:id",
        element: <ProductDetail />
    },
    {
        path: "products/edit/:id",
        element: <ProductEdit />
    }
];
export default productRoutes;