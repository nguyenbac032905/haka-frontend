import { useRoutes } from "react-router-dom";
import clientRoutes from "../client/clientRoutes";
import adminRoutes from "../admin/adminRoutes";
function AppRoutes(){
    const routes = useRoutes([
        ...clientRoutes,
        ...adminRoutes
    ]);
    return routes;
}
export default AppRoutes;