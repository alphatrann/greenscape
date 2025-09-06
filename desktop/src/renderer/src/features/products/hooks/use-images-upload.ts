import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { MAX_FILES } from "../constants";
import { FilePreview, ProductImage } from "../types";

export const useImagesUpload = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [prevImages, setPrevImages] = useState<ProductImage[]>([]);

  const populateImages = useCallback((existingImages: ProductImage[]) => {
    setPrevImages(existingImages);
  }, []);

  const dropzoneState = useDropzone({
    multiple: true,
    maxSize: Math.pow(1024, 2) * 5, // 5MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length + prevImages.length > MAX_FILES)
        toast.error(`Cannot have more than ${MAX_FILES} images`);
      else
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
    },
  });

  const clearFiles = useCallback(() => {
    setFiles([]);
    setPrevImages([]);
  }, []);

  const createFilesFormData = useCallback(() => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    return formData;
  }, [files]);

  const deleteFile = useCallback((url: string) => {
    setPrevImages((prevImages) =>
      prevImages.filter((image) => image.file.url !== url),
    );
    setFiles((prevFiles) => prevFiles.filter((file) => file.preview !== url));
  }, []);

  return {
    prevImages,
    dropzoneState,
    files,
    clearFiles,
    createFilesFormData,
    deleteFile,
    populateImages,
  };
};
