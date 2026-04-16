import homeRoutes from "./features/home/homeRoutes";
import authRoutes from "./features/auth/authRoutes";
import ClientLayout from "./layouts/ClientLayout";
const clientRoutes = [
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            ...homeRoutes,
            ...authRoutes
        ]
    }
]
export default clientRoutes