export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dd8jqb4rl");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd8jqb4rl/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();
    return data.secure_url;
};