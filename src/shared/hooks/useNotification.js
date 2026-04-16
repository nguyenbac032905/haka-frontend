import { notification } from "antd"

export function useNotification(){
    const success = (msg) => {
        notification.success({message:msg,duration: 3});
    };
    const error = (msg, desc) =>
        notification.error({
        message: msg,
        description: desc,
        placement: "topRight",
        duration: 3
    });
    return { success, error };
}