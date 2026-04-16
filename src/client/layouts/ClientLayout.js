import { Outlet } from "react-router-dom";
import "./clientLayout.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
function ClientLayout(){
    return(
        <div className="layout-default">
            <div className="layout-default__header">
                <Header />
            </div>
            <div className="layout-default__main">
                <Outlet />
            </div>
            <div className="layout-default__footer">
                <Footer />
            </div>
        </div>
    )
}
export default ClientLayout;