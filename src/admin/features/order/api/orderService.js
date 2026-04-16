import * as request from "../../../../shared/utils/request";
export const getOrders = async () => {
    const result = await request.get("orders?deleted=false");
    return result
}
export const editOrder = async (idOrder,option) => {
    const result = await request.patch(`orders/${idOrder}`,option);
    return result
}
export const getOrder = async (idOrder) => {
    const result = await request.get(`orders/${idOrder}`);
    return result
}
