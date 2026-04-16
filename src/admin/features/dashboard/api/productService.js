import * as request  from "../../../../shared/utils/request";
export const getListProduct = async () => {
    const result = await request.get(`products`);
    return result;
}