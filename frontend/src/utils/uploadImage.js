const uploadImage = async (image) => {
  const CLOUD_NAME = "dhmcyqyjt"; // Replace with your Cloudinary cloud name
  const UPLOAD_PRESET = "AINote"; // Replace with your upload preset

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data; // Return uploaded image URL
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export default uploadImage;
