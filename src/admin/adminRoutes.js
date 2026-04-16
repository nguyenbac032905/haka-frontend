import AdminLayout from "./layouts/AdminLayout";
import AdminPrivate from "./components/PrivateRouter/AdminPrivate";

import authRoutes from "./features/auth/authRoutes";
import dashboardRoutes from "./features/dashboard/dashboardRoutes";
import productRoutes from "./features/products/productRoutes";
import categoryRoutes from "./features/product-category/categoryRoutes";
import { orderRoutes } from "./features/order/orderRoutes";
const adminRoutes = [
    {
        path: "/admin",
        children: [
            ...authRoutes,
            {
                element: <AdminPrivate />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            ...dashboardRoutes,
                            ...productRoutes,
                            ...categoryRoutes,
                            ...orderRoutes
                        ]
                    }
                ]
            }
        ]
    }
];
export default adminRoutes;