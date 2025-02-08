import { useEffect, useState } from "react";
import { OOTD, SimpleOutfitItem } from "../types/ootd";

interface OOTDGridProps {
  ootd?: OOTD | null;
  onClick?: (item?: SimpleOutfitItem) => void;
  selectedItems: SimpleOutfitItem[] | undefined;
  isEditing: boolean;
}

const OOTDOutfitGrid = ({ ootd, onClick, selectedItems, isEditing, }: OOTDGridProps) => {
  const layout = ootd? ootd.layout : "single";
  const [totalCells, setTotalCells] = useState(() =>
    layout === "single" ? 1 : layout === "double" ? 2 : layout === "four-grid" ? 4 : 9);
  const [filledCells, setFilledCells] = useState(() => (selectedItems ?
     selectedItems.length :ootd ? ootd.items.length : 0));
  const [emptyCells, setEmptyCells] = useState(() => totalCells - filledCells);
  
  useEffect(() => {    
    const filledCellsNum = selectedItems ?
    selectedItems.length :ootd ? ootd.items.length : 0;
    const updateTotalCellNum = layout === "single" ? 1 : layout === "double" ? 2 : layout === "four-grid" ? 4 : 9
    const updateEmptyCellNum = updateTotalCellNum - filledCellsNum;

    setFilledCells(filledCellsNum);    
    setTotalCells(updateTotalCellNum);
    setEmptyCells(updateEmptyCellNum);
console.log(filledCellsNum, updateTotalCellNum, updateEmptyCellNum)
  }, [layout, ootd?.items, ootd, selectedItems]);

  const renderItem = (item: SimpleOutfitItem, index: number) => (
    <div
      key={index}
      className={`render-one-item relative w-full aspect-square cursor-pointer rounded ${
        ootd && ootd.items.find((el: SimpleOutfitItem) => el.id === item.id) ? "opacity-100" : "opacity-60"
      }`}
      onClick={() => onClick && onClick(item)}
    >
      <img src={item.imageUrl} alt="Item" className="w-full h-full object-cover rounded" />
    </div>
  );

  return (
    <div id="ootd-grid"
      className={`grid gap-[1px] max-w-full h-full hover:cursor-pointer hover:opacity-100
        ${
        totalCells === 1 ? "grid-cols-1" :
        totalCells === 2 ? "grid-cols-2 grid-rows-1" :
        totalCells === 4 ? "grid-cols-2 grid-rows-2" :
        "grid-cols-3 grid-rows-3"
      }`}
    >
      {ootd && ootd.items.map((item, i) => renderItem(item, i))}
      {/** 若 selectedItems undefined，不進行以下判斷*/}
      {isEditing && Array.from({ length: emptyCells }).map((_, i) => (
        <div key={`empty-${i}`} className="empty-cell
        w-full sm:max-w-full md:max-w-full aspect-square bg-gray-100 rounded" />
      ))}
      {
        !isEditing && !ootd && (
          <div key={`empty-without-outfit`} className="empty-cell
          w-full md:max-w-full md:max-w-full aspect-square bg-gray-100 rounded" />
        )
      }
    </div>
  );
};

export default OOTDOutfitGrid;
