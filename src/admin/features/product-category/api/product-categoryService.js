import * as request from "../../../../shared/utils/request";
export const getListCategory = async () => {
    const result = await request.get("product_categories?deleted=false");
    return result
}
export const getCategory = async (idCategory) => {
    const result = await request.get(`product_categories/${idCategory}`);
    return result;
}
export const createCategory = async (option) => {
    const result = await request.post("product_categories",option);
    return result;
}
export const editCategory = async (idCategory, option) => {
    const result = await request.patch(`product_categories/${idCategory}`,option);
    return result
}