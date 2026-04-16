import * as request from "../../../../shared/utils/request";

export const getOrders = async () => {
    const result = await request.get("orders");
    return result;
}