import * as request from "../../../../shared/utils/request";
export const checkLogin = async (email,password) => {
    const result = await request.get(`users?email=${email}&password=${password}`);
    return result;
};
export const verifyToken = async (email,token) => {
    const result = await request.get(`users?email=${email}&token=${token}`);
    return result;
}