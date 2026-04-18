import * as request from "../../../../shared/utils/request";
export const getCartByUserId = async (userId) => {
    const result = await request.get(`carts?user_id=${userId}`);
    return result
}
export const createCart = async (option) => {
    const result = await request.post(`carts`,option);
    return result
}
export const getCart = async (cartId) => {
    const result = await request.get(`carts/${cartId}`);
    return result
}