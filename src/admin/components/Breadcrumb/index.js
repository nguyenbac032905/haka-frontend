import { Link, useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../shared/helpers/capitalizeFirstLetter";
import { Breadcrumb } from "antd";

function AdminBreadCrumb(){
    const location = useLocation();
    // tạo breadcum
    const pathSniper = location.pathname.split("/").filter(i => i);
    const breadcrumbItems = [];
    let url = "";
    pathSniper.forEach((segment, index) => {
        url += `/${segment}`;
        const isId = !isNaN(segment);
        if (isId) return;
        if (index === 0) {
            breadcrumbItems.push({
                title: <span>{capitalizeFirstLetter(segment)}</span>
            });
        } else {
            breadcrumbItems.push({
                title: <Link to={url}>
                    {capitalizeFirstLetter(segment)}
                </Link>
            });
        }
    });
    return(
        <>
            <Breadcrumb
                className="admin-layout__breadcrumb"
                items={breadcrumbItems}
            />
        </>
    )
}
export default AdminBreadCrumb;