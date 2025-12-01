// imagekitHelper.js
import ImageKit from "imagekit";

// Setup ImageKit instance
const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: "/api/imagekit-auth" 
});


export const uploadImageToImageKit = (file, folder = "/trainer-profile") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // convert file to base64
    reader.onload = () => {
      imagekit.upload(
        {
          file: reader.result,
          fileName: file.name,
          folder
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.url); // return uploaded image URL
          }
        }
      );
    };
    reader.onerror = error => reject(error);
  });
};
