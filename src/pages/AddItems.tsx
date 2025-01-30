import { useTranslation } from "react-i18next";
import { addImage, removeImage } from "../features/imageSlice";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

function AddItems() {
  const { t } = useTranslation();
  const images = useSelector((state: RootState) => state.image.images);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("Cloth.AddClothes")}</h1>
      <p>{t("Cloth.UploadClothesDescription")}</p>

      {/* 這裡稍後會加入圖片上傳的元件 */}
      <div className="mt-4 border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
        {t("Cloth.UploadArea")}
      </div>
      <div className="p-4">
      <h1 className="text-2xl font-bold">Test Redux</h1>

      <button
        onClick={() => dispatch(addImage("https://example.com/sample-image.jpg"))}
        className="bg-primary text-white p-2 rounded mt-2"
      >
        Add Image
      </button>

      <button
        onClick={() => dispatch(removeImage(0))}
        className="bg-secondary text-white p-2 rounded mt-2 ml-2"
      >
        Remove First Image
      </button>

      <div className="mt-4">
        <h2>Uploaded Images:</h2>
        {images.map((img, index) => (
          <div key={index} className="mt-2">
            <img src={img} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default AddItems;
