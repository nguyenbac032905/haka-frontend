import * as request from "../../../../shared/utils/request";
export const getListCategory = async () => {
    const result = await request.get("product_categories?deleted=false&status=active");
    return result
}
export const getCategoryBySlug = async (slug) => {
    const result = await request.get(`product_categories?deleted=false&status=active&slug=${slug}`);
    return result
}