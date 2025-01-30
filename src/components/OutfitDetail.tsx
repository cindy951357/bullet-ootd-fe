import { useTranslation } from "react-i18next";

interface OutfitDetailProps {
  date: moment.Moment;
  onClose: () => void;
}

function OutfitDetail({ date, onClose }: OutfitDetailProps) {
  const { t } = useTranslation();

  return (
    <div id="outfit-detail-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div id="outfit-detail-box" className="bg-white p-6 rounded-lg shadow-lg text-center w-96 relative">
        <button id="btn-close-outfit-detail" onClick={onClose} className="btn-close absolute top-2 right-2">
          ✕
        </button>

        <h2 id="outfit-detail-title" className="text-lg font-bold">{date.format("YYYY-MM-DD")}</h2>
        <p id="outfit-detail-description" className="mt-2">{t("Outfit details for this day")}</p>

        {/* OOTD 圖片 */}
        <img
          src={`/demo-outfits/fullset-0${(date.date() % 2) + 1}.png`}
          alt="Outfit"
          className="w-full aspect-square object-cover rounded mt-4"
        />

        <div id="outfit-detail-btn-group" className="mt-4 flex justify-center gap-4">
          <button id="btn-edit-outfit" className="btn-cancel">{t("Edit")}</button>
          <button id="btn-delete-outfit" className="btn-cancel">{t("Delete")}</button>
        </div>
      </div>
    </div>
  );
}

export default OutfitDetail;
