import * as request from "../../../../shared/utils/request";
export const checkLogin = async (email,password) => {
    const result = await request.get(`users?email=${email}&password=${password}`);
    return result;
};
export const verifyToken = async (email,token) => {
    const result = await request.get(`users?email=${email}&tokenUser=${token}`);
    return result;
}
export const registerPost = async (option) => {
    const result = await request.post(`users`,option);
    return result;
}
export const checkExistEmail = async (email) => {
    const result = await request.get(`users?email=${email}`);
    return result;
};