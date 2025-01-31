import { useTranslation } from "react-i18next";
import { RootState } from "../store";
import { useSelector, } from "react-redux";
import ImageUploader from "../components/ImageUploader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

function AddItems() {
  const { t } = useTranslation();
  const images = useSelector((state: RootState) => state.image.images);
  const navigate = useNavigate();
  const [showUploadWarning, setShowUploadWarning] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  
  // 防止用戶在沒有上傳圖片時離開
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (images.length === 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [images]);

  // 處理提交按鈕點擊
  const handleSubmit = () => {
    if (images.length === 0) {
      setShowUploadWarning(true);
    } else {
      console.log("圖片提交成功！", images);
    }
  };

  // 處理頁面跳轉時的彈窗
  const handleLeavePage = () => {
    if (images.length > 0) {
      setShowLeaveWarning(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div id="add-items" className="p-4">
      <h1 className="text-2xl font-bold">{t("Cloth.AddClothes")}</h1>
      <p>{t("Cloth.UploadClothesDescription")}</p>

      {/* 插入圖片上傳元件 */}
      <ImageUploader />

       {/* 按鈕組 */}
       <div id="add-items-btn-group" className="mt-4 flex gap-4 flex-wrap justify-center sm:flex-col">
        <button
          id="btn-submit"
          onClick={handleSubmit}
          className="p-2"
        >
          {t("Submit")}
        </button>

        <button
          id="btn-cancel-add-items"
          onClick={handleLeavePage}
          className="btn-cancel p-2"
        >
          {t("Cancel")}
        </button>
      </div>

      {/* 上傳圖片數量為 0 時的警告 Popup */}
      {showUploadWarning && (
        <Popup
          title="Popup.UploadWarningTitle"
          message="Popup.UploadWarningMessage"
          onConfirm={() => setShowUploadWarning(false)}
          confirmText="OK"
        />
      )}

      {/* 嘗試離開頁面時的警告 Popup */}
      {showLeaveWarning && (
        <Popup
          title="Popup.LeavePageTitle"
          message="Popup.LeavePageMessage"
          onConfirm={() => navigate("/")}
          onCancel={() => setShowLeaveWarning(false)}
          confirmText="OK"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default AddItems;
