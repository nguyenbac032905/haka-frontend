import * as request from "../../../../shared/utils/request";

export const createOrder = async (option) => {
    const result = await request.post("orders", option);
    return result
}
export const getOrder = async (idOrder) => {
    const result = await request.get(`orders/${idOrder}`);
    return result
}
export const getListOrderByUser = async (userId) => {
    const result = await request.get(`orders/?user_id=${userId}`);
    return result
}
export const editOrder = async (idOrder,option) => {
    const result = await request.patch(`orders/${idOrder}`,option);
    return result
}