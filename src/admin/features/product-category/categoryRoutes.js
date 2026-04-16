import Category from "./pages/Category";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryDetail from "./pages/CategoryDetail";
import CategoryEdit from "./pages/CategoryEdit";

const categoryRoutes = [
    {
        path: "product-category",
        element: <Category />
    },
    {
        path: "product-category/create",
        element: <CategoryCreate />
    },
    {
        path: "product-category/detail/:id",
        element:  <CategoryDetail />
    },
    {
        path: "product-category/edit/:id",
        element:  <CategoryEdit />
    }
];
export default categoryRoutes;