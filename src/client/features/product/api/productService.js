import * as request  from "../../../../shared/utils/request";
export const getListProduct = async () => {
    const result = await request.get(`products?deleted=false&status=active`);
    return result;
}
export const getProduct = async (slug) => {
    const result = await request.get(`products?slug=${slug}`);
    return result;
}
export const editProduct = async (idProduct,option) => {
    const result = await request.patch(`products/${idProduct}`, option);
    return result
}