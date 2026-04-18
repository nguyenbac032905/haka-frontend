import homeRoutes from "./features/home/homeRoutes";
import authRoutes from "./features/auth/authRoutes";
import ClientLayout from "./layouts/ClientLayout";
import ClientPrivate from "./components/PrivateRouter";
import Cart from "./features/cart/pages/Cart";
import { productRoutes } from "./features/product/productRoutes";
import { cartRoutes } from "./features/cart/cartRoutes";
import { categoryRoutes } from "./features/category/categoryRoutes";
const clientRoutes = [
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            ...homeRoutes,
            ...authRoutes,
            ...productRoutes,
            ...categoryRoutes,
            {
                element: <ClientPrivate />,
                children: [
                    ...cartRoutes
                ]
            }
        ]
    }
]
export default clientRoutes