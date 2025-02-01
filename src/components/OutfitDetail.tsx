import { useState } from "react";
import OOTDOutfitGrid from "./OOTDOutfitGrid";
import { OOTD, OutfitItem } from "../types/ootd";

interface OutfitDetailProps {
  outfitId: string;
  date: string;
  outfits: OOTD[];
  onClose: () => void;
}

function OutfitDetail({ outfitId, date, outfits, onClose }: OutfitDetailProps) {
  // 根據 outfitId 找到對應的 OOTD
  const ootd = outfits.find((outfit) => outfit.id === outfitId);

  // 狀態：儲存被選中的單品
  const [selectedItem, setSelectedItem] = useState<OutfitItem | null>(null);

  // 點選單品事件處理
  const handleSelectItem = (item: OutfitItem) => {
    console.log("handleSelectItem", item);
    setSelectedItem(item);
  };

  return (
    <div
      id="outfit-detail-popup"
      className="fixed inset-0 bg-black flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="btn-close absolute right-6 top-6 aspect-square">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{date}</h2>

        {ootd && (
          <OOTDOutfitGrid
            ootd={ootd}
            onClick={(item) => handleSelectItem(item)} // 傳遞點選事件
            selectedItem={selectedItem} // 傳遞當前被選中的單品
          />
        )}
        {!ootd && (
          <div className="w-full aspect-square bg-gray-300 rounded flex items-center justify-center">
            <img
              src="/icon-hanger-stroked.svg"
              alt="logo"
              className="placeholder-hanger sm:w-4 w-8 lg:w-12 xl:w-16"
            />
          </div>
        )}

        {/* 顯示選中單品的詳細資訊 */}
        <div className="mt-4 p-4 border-primary rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Selected Item Details</h3>
          
          {selectedItem ? (
            <ol id="detail-of-selected-item" className="list-decimal ml-5">
              <li className="detail-category">
                <strong>Category:</strong> {selectedItem.category}
              </li>
              {selectedItem.subCategory && (
                <li className="detail-sub-category">
                  <strong>Sub-Category:</strong> {selectedItem.subCategory}
                </li>
              )}
              {selectedItem.brand && (
                <li className="detail-brand">
                  <strong>Brand:</strong> {selectedItem.brand}
                </li>
              )}
              {selectedItem.wearCount !== undefined && (
                <li className="detail-wear-count">
                  <strong>Worn:</strong> {selectedItem.wearCount} time(s)
                </li>
              )}
              {selectedItem.rating && (
                <li className="detail-rating">
                  <strong>Rating:</strong> {selectedItem.rating} / 5
                </li>
              )}
            </ol>
          ) : (
            <p>No item selected.</p>
          )}
        </div>        
      </div>
    </div>
  );
}

export default OutfitDetail;
