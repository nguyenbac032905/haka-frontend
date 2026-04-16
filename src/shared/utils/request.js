const API_DOMAIN = "http://localhost:3002";
export const get = async (path) => {
    const res = await fetch(`${API_DOMAIN}/${path}`);
    const result = await res.json();
    return result;
};
export const post = async (path,option) => {
    const res = await fetch(`${API_DOMAIN}/${path}`,{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = await res.json();
    return result;
};
export const del = async (path) => {
    const res = await fetch(`${API_DOMAIN}/${path}`,{
        method: "DELETE"
    });
    const result = await res.json();
    return result;
};
export const patch = async (path,option) => {
    const res = await fetch(`${API_DOMAIN}/${path}`,{
        method:"PATCH",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = await res.json();
    return result;
}
