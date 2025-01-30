import { useTranslation } from "react-i18next";
import { addImage, removeImage } from "../features/imageSlice";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../components/ImageUploader";

function AddItems() {
  const { t } = useTranslation();
  const images = useSelector((state: RootState) => state.image.images);
  const dispatch = useDispatch();

  return (
    <div id="add-items" className="p-4">
      <h1 className="text-2xl font-bold">{t("Cloth.AddClothes")}</h1>
      <p>{t("Cloth.UploadClothesDescription")}</p>

      {/* 插入圖片上傳元件 */}
      <ImageUploader />
    </div>
  );
}

export default AddItems;
