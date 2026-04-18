import * as request from "../../../../shared/utils/request";
export const getCartItemByCartId = async (cartId) => {
    const result = await request.get(`cart_items?cart_id=${cartId}`);
    return result;
}
export const addCartItem = async (option) => {
    const result = await request.post(`cart_items`,option);
    return result;
}
export const updateCartItem = async (itemId,option) => {
    const result = await request.patch(`cart_items/${itemId}`,option);
    return result
}
export const deleteCartItem = async (itemId) => {
    const result = await request.del(`cart_items/${itemId}`);
}
export const deleteCartItemByCartId = async (cartId) => {
    const items = await getCartItemByCartId(cartId);

    await Promise.all(
        items.map(item => request.del(`cart_items/${item.id}`))
    );

    return true;
}