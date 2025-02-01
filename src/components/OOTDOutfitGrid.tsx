import { OOTD, OOTDItem } from "../types/ootd";

interface OOTDGridProps {
  ootd?: OOTD;
  selectedItem?: OOTDItem | null; // 被選中的單品
  onClick?: (item: OOTDItem) => void; // 點選事件
}

const OOTDOutfitGrid = ({ ootd, selectedItem, onClick }: OOTDGridProps) => {
  if (!ootd) {
    return <div className="cell-without-ootd w-full h-full bg-gray-100 rounded" />;
  }

  /**
   * 渲染單一 OOTD 單品的元件，根據是否為被選中項目調整透明度。
   * - 如果 `selectedItem` 的 id 與當前單品的 id 匹配，設定 opacity 為 100。
   * - 提供點擊事件，將當前單品的資料傳遞給父層的 `onClick` 處理函數。
   * - 適用於所有佈局模式中的單品顯示。
   */
  const renderItem = (item: OOTDItem, index: number) => (
    <div
      key={index}
      className={`relative w-full aspect-square cursor-pointer rounded ${
        selectedItem?.id === item.id ? "opacity-100" : "opacity-60"
      }`}
      onClick={() => {
        onClick && onClick(item);
        console.log('clicked item at child layer', item)
      }}
    >
      <img
        src={item.image}
        alt="OOTD"
        className="w-full h-full object-cover rounded"
      />
    </div>
  );

  if (ootd.layout === "single") {
    return (
      <div
        className="single-outfit-grid flex justify-center items-center w-full h-full
        opacity-60 hover:opacity-100 hover:cursor-pointer"
      >
        {renderItem(ootd.items[0], 0)}
      </div>
    );
  }

  if (ootd.layout === "double") {
    return (
      <div
        className="double-outfit-grid grid grid-cols-2 grid-rows-2 gap-1 w-full h-full
        opacity-60 hover:opacity-100 hover:cursor-pointer"
      >
        {ootd.items.map((item, i) => renderItem(item, i))}
      </div>
    );
  }

  if (ootd.layout === "four-grid") {
    return (
      <div
        className="four-outfit-grid grid grid-cols-2 grid-rows-2
        gap-1 w-full h-full hover:cursor-pointer
        opacity-60 hover:opacity-100"
      >
        {ootd.items.map((item, i) => renderItem(item, i))}
      </div>
    );
  }

  if (ootd.layout === "nine-grid") {
    return (
      <div
        className="nine-outfit-grid 
        grid grid-cols-3 grid-rows-3 gap-1 w-full h-full
        opacity-60 hover:opacity-100 border-gray border-solid
        hover:cursor-pointer"
      >
        {ootd.items.map((item, i) => renderItem(item, i))}
      </div>
    );
  }

  return null;
};

export default OOTDOutfitGrid;
