import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

import { addOOTD } from "../features/ootdSlice";
import { useTranslation } from "react-i18next";
import { LayoutType, SimpleOutfitItem } from "../types/ootd";
import OOTDOutfitGrid from "../components/OOTDOutfitGrid";

const layoutOptions: {id: LayoutType, cols: number, nums: number}[] = [
  { id: "single", cols: 1, nums: 1,},
  { id: "double", cols: Math.sqrt(2), nums: 2, },
  { id: "four-grid", cols: 2, nums: 4,},
  { id: "nine-grid", cols: 3, nums: 9, },
];

function AddOutfit() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const closetItems = useSelector((state: RootState) => state.image.items);
  const [newId, setNewId] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<SimpleOutfitItem[]>([]);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>("single");

  const toggleSelectItem = ({ id, imageUrl, } : {id: string, imageUrl: string}) => {
    const foundItem = selectedItems.find((item) => item.id === id);
    if(foundItem?.isSelected) {
      // 移除此項目
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
      return;
    }
    const newItem = {id, imageUrl, isSelected: true};
    const foundLayout = layoutOptions.find((layoutEl) => layoutEl.id === currentLayout);
    const cellNumsCeiling = foundLayout && foundLayout.nums;
    if(cellNumsCeiling && selectedItems.length < cellNumsCeiling) {
      setSelectedItems([...selectedItems, {...newItem}]);
    };
  }

  const onLayoutBtnClick = (clickedLayoutId: LayoutType) => {
    setCurrentLayout(clickedLayoutId);
  }

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert(t("Popup.UploadWarningMessage"));
      return;
    }
    const genNewId = uuidv4();
    setNewId(genNewId);
    dispatch(addOOTD({ id: genNewId, layout: currentLayout, items: selectedItems }));
  };

  useEffect(() => {
    const genNewId = uuidv4();
    setNewId(genNewId);
  }, [])

  return (
    <div id="add-outfit-page" className="p-4">
      <h1 className="text-2xl font-bold">{t("Outfit.AddOOTDTitle")}</h1>

      {/* 選擇拼圖模板區 */}
      <div id="puzzle-to-choose-container" className="mt-4">
        <p>{t("Outfit.SelectLayoutMsg")}</p>
        <div className="flex gap-2">
          {layoutOptions.map((layoutOpt) => (
            <button
              key={layoutOpt.id}
              onClick={() => onLayoutBtnClick(layoutOpt.id)}
              className={`p-2 rounded
                ${currentLayout === layoutOpt.id ? "bg-secondary" : "bg-gray-200"}`}
            >
              {layoutOpt.id}
            </button>
          ))}
        </div>
      </div>

      {/* 衣物選擇區 */}
      <div id="item-candidates-container" className="mt-4 grid grid-cols-4 gap-2">
        <span id="add-outfit-closet-title" className="flex">{t('Outfit.closetTitle')}</span>
        {closetItems.map(({id, imageUrl,}, index) => (
          <img
            key={index}
            src={imageUrl}
            alt="wardrobe item"
            className={`w-full aspect-square cursor-pointer rounded ${
              selectedItems.find(el => el.id === id)
              ? "border-8 border-primary"
              : ""
            }`}
            onClick={() => {
              toggleSelectItem({id, imageUrl, })
            }}
          />
        ))}
      </div>

      {/* 預覽拼圖區 */}
      <div className="flex justify-center py-2 mt-2 border-t border-gray-200">
        <OOTDOutfitGrid  ootd={{ id: newId, layout: currentLayout, items: selectedItems}} selectedItems={selectedItems}
        onClick={() => {}} />
      </div>      

      {/* 提交按鈕 */}
      <button onClick={handleSubmit} className="btn-submit w-full mt-4">
        {t("Submit")}
      </button>
    </div>
  );
};

export default AddOutfit;