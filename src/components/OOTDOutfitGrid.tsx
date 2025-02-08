import { LayoutType, OOTD, SimpleOutfitItem } from "../types/ootd";

interface OOTDGridProps {
  ootd?: OOTD | null;
  onClick?: (item?: SimpleOutfitItem) => void;
  layout: LayoutType;
}

const OOTDOutfitGrid = ({ ootd, onClick, layout }: OOTDGridProps) => {
console.log("ootd", ootd, "layout", layout)
  const totalCells = layout === "single" ? 1 : layout === "double" ? 2 : layout === "four-grid" ? 4 : 9;
  const filledCells = ootd ? ootd.items.length : 0;
  const emptyCells = totalCells - filledCells;

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
      className={`grid gap-1 w-full max-w-1/2 h-full hover:cursor-pointer hover:opacity-100 ${
        totalCells === 1 ? "grid-cols-1" :
        totalCells === 2 ? "grid-cols-2 grid-rows-1" :
        totalCells === 4 ? "grid-cols-2 grid-rows-2" :
        "grid-cols-3 grid-rows-3"
      }`}
    >
      {ootd && ootd.items.map((item, i) => renderItem(item, i))}
      {Array.from({ length: emptyCells }).map((_, i) => (
        <div key={`empty-${i}`} className="empty-cell
        w-full aspect-square bg-gray-100 rounded" />
      ))}
    </div>
  );
};

export default OOTDOutfitGrid;
