import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, removeImage } from "../features/imageSlice";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import { MAX_IMAGES, MIN_PLACEHOLDERS } from '../constant/index.ts';

function ImageUploader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.image.images);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 計算應該顯示多少個方格
  const totalSlots = Math.max(images.length, MIN_PLACEHOLDERS);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > MAX_IMAGES) {
      alert(t("Cloth.UploadLimit", { max: MAX_IMAGES }));
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          dispatch(addImage(reader.result));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div id="image-uploader" className="p-4 border-2 border-dashed border-gray-400 rounded-lg text-center">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />

      <button id="btn-select-img"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded w-full"
      >
        {t("Cloth.SelectImages")}
      </button>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {Array.from({ length: totalSlots }).map((_, index) => (
          index < images.length ? (
            <div key={`uploaded-${index}`} className="relative aspect-square">
              <img
                src={images[index]}
                alt={`Uploaded ${index}`}
                className="w-full object-cover aspect-square rounded"
              />
              <button
                onClick={() => dispatch(removeImage(index))}
                className="absolute w-8 top-0 right-0 bg-close text-white p-1 rounded hover:cursor-pointer aspect-square hover:bg-close-hovered"
              >
                ✕
              </button>
            </div>
          ) : (
            <div
              key={`placeholder-${index}`}
              id={`placeholder-${index}`}
              className="w-full bg-gray-100 aspect-square rounded"
            />
          )
        ))}
        </div>
    </div>
  );
}

export default ImageUploader;
