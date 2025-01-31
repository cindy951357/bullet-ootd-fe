import SingleOutfitGrid from "./SingleOutfitGrid";
import { OOTD } from "../types/ootd";

interface OutfitDetailProps {
  outfitId: string;
  date: string;
  outfits: OOTD[];
  onClose: () => void;
}

function OutfitDetail({ outfitId, date, outfits, onClose }: OutfitDetailProps) {
  // 根據 outfitId 找到對應的 OOTD
  const ootd = outfits.find(outfit => outfit.id === outfitId);

  return (
    <div
      id="outfit-detail-popup"
      className="fixed inset-0 bg-black flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="btn-close">✕</button>
        <h2 className="text-xl font-bold mb-4">{date}</h2>

        {ootd && <SingleOutfitGrid ootd={ootd} />}
        {!ootd && <p className="text-gray-500">No outfit data for this date.</p>}
      </div>
    </div>
  );
}

export default OutfitDetail;
