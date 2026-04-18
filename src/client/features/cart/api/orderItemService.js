import * as request from "../../../../shared/utils/request";

export const createOrderItem = async (option) => {
    const result = await request.post("order_items", option);
    return result
}
export const getOrderDetailByOrderId = async (orderId) => {
    const result = await request.get(`order_items?order_id=${orderId}`);
    return result;
}