export const toSlug = (str) => {
    return str
        .toLowerCase()
        // bỏ dấu tiếng Việt
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        // thay ký tự đặc biệt thành khoảng trắng
        .replace(/[^a-z0-9\s-]/g, "")
        // thay nhiều khoảng trắng thành 1 dấu -
        .trim()
        .replace(/\s+/g, "-")
        // xóa nhiều dấu - liên tiếp
        .replace(/-+/g, "-");
};