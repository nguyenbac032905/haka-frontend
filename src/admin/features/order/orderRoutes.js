import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";

export const orderRoutes = [
    {
        path: "/admin/orders",
        element: <Order />
    },
    {
        path: "/admin/orders/detail/:id",
        element: <OrderDetail />
    }
];