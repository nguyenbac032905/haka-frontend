import * as request  from "../../../../shared/utils/request";
export const getListProduct = async () => {
    const result = await request.get(`products?deleted=false`);
    return result;
}
export const createProduct = async (option) => {
    const result = await request.post("products",option);
    return result;
}
export const editProduct = async (idProduct,option) => {
    const result = await request.patch(`products/${idProduct}`, option);
    return result
}
export const getProduct = async (idProduct) => {
    const result = await request.get(`products/${idProduct}`);
    return result;
}