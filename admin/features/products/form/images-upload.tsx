import { getLocalImage } from "@/features/common/utils";
import { FilePreview, ProductImage } from "@/features/products/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import { memo, useMemo } from "react";
import { DropzoneState } from "react-dropzone";
import { MAX_FILES } from "../constants";
import { ImageDropzone } from "./image-dropzone";
import { PreviewImage } from "./preview-image";

interface ImagesUploadProps {
  dropzoneState: DropzoneState;
  files: FilePreview[];
  existingImages?: ProductImage[];
  deleteImage: (url: string) => void;
  loading: boolean;
}

export const ImagesUpload: React.FC<ImagesUploadProps> = memo(
  ({ dropzoneState, files, loading, existingImages = [], deleteImage }) => {
    const urls = useMemo(
      () =>
        existingImages
          .map((image) => image.file.url || getLocalImage(image.file.id))
          .concat(files.map((file) => file.preview)),
      [files, existingImages],
    );
    return (
      <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Upload up to 4 images displaying the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {urls.length > 0 ? (
              <PreviewImage deleteImage={deleteImage} url={urls[0]} size="lg" />
            ) : files.length > 0 ? (
              <PreviewImage deleteImage={deleteImage} url={urls[0]} size="lg" />
            ) : (
              <ImageDropzone loading={loading} dropzoneState={dropzoneState} />
            )}
            <div className="grid grid-cols-3 gap-2">
              {urls.slice(1).map((url) => (
                <PreviewImage
                  deleteImage={deleteImage}
                  loading={loading}
                  key={url}
                  size="sm"
                  url={url}
                />
              ))}

              {urls.length > 0 && urls.length < MAX_FILES && (
                <ImageDropzone
                  loading={loading}
                  dropzoneState={dropzoneState}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
