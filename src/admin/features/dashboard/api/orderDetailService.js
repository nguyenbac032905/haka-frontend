import * as request from "../../../../shared/utils/request";
export const getOrderDetailByOrderId = async (orderId) => {
    const result = await request.get(`order_items?order_id=${orderId}`);
    return result;
}
export const getOrdersDetail = async () => {
    const result = await request.get("order_items");
    return result;
}