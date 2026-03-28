export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    // se agrega el archivo de imagen al formulario
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    console.log("Cloudinary response:", data);
    console.log("preset:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    if (data.secure_url) {
      return { success: true, url: data.secure_url };
    } else {
      return { success: false, message: "Error subiendo imagen" };
    }
  } catch (error) {
    console.error("Error subiendo imagen: ", error);
    return { success: false, message: error.message };
  }
};
