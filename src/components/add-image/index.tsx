//TODO: Imgage cropping before upload

import React, { useState } from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <span className="loading loading-spinner loading-lg"></span>
      <h1 className="mx-2 text-black font-semibold"> Uploading Image(s) </h1>
    </div>
  );
};

interface Image {
  id: string;
  src: string;
}

interface ImageUploaderProps {
  onImagesUploaded: (newImages: Image[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [fileSizeError, setFileSizeError] = useState<boolean>(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const files = event.target.files;

    if (files) {
      const validFiles: File[] = Array.from(files).filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFileSizeError(true);
          setTimeout(() => setFileSizeError(false), 3000);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        setUploading(false);
        return;
      }

      const uploadPromises = Array.from(files).map((file) => {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", "produt_image");
        formdata.append("public_id", `${Date.now()}`);
        formdata.append("api_key", "355361821928278");

        const requestOptions: RequestInit = {
          method: "POST",
          body: formdata,
          redirect: "follow" as RequestRedirect,
        };

        return fetch("https://api.cloudinary.com/v1_1/fashion-boutique/image/upload", requestOptions)
          .then((response) => response.json())
          .then((result) => ({ id: result.public_id, src: result.secure_url }))
          .catch((error) => {
            console.error("Error uploading image:", error);
            return null;
          });
      });

      try {
        const uploadedImages = await Promise.all(uploadPromises);
        const filteredImages = uploadedImages.filter((image): image is Image => image !== null);
        onImagesUploaded(filteredImages);
      } catch (error) {
        console.error("Error uploading one or more images:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      {uploading && <Loader />}
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="label">
          <span className="label-text">Pick a file</span>
        </div>
        <div className="relative w-32 h-33 border border-dashed border-[#d3d4d7] rounded-md flex items-center justify-center">
          <span className="text-4xl text-[#a2a2a5]">+</span>
        </div>
      </label>
      <input id="file-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
      {fileSizeError && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-info bg-red">
            <span className="text-white">Size of cannot be more than 10MB</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
