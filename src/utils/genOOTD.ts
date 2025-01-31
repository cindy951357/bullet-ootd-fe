import { OOTD, OutfitItem, LayoutType } from "../types/ootd";
import moment from "moment";

// 假設的衣物清單
const demoItems: OutfitItem[] = [
  { id: "1", image: "/demo-outfits/top-01.png", category: "top" },
  { id: "2", image: "/demo-outfits/top-02.png", category: "top" },
  { id: "3", image: "/demo-outfits/bottom-01.png", category: "bottom" },
  { id: "4", image: "/demo-outfits/bottom-02.png", category: "bottom" },
  { id: "5", image: "/demo-outfits/footwear-01.png", category: "footwear" },
  { id: "6", image: "/demo-outfits/footwear-02.png", category: "footwear" },
  { id: "7", image: "/demo-outfits/accessory-01.png", category: "accessory" },
  { id: "8", image: "/demo-outfits/accessory-02.png", category: "accessory" },
  { id: "9", image: "/demo-outfits/outerwear-01.png", category: "outerwear" },
  { id: "10", image: "/demo-outfits/outerwear-02.png", category: "outerwear" },
  { id: "11", image: "/demo-outfits/fullset-01.png", category: "fullset" },
  { id: "12", image: "/demo-outfits/fullset-02.png", category: "fullset" },
];

// 布局類型
const layouts: LayoutType[] = ["single", "double", "four-grid", "nine-grid"];

// 生成 `k` 套衣服，每套衣服分配 `j` 天
export const generateRandomOOTD = (k: number, j: number) => {
  const outfits: OOTD[] = [];
  const dateMapping: { date: string; outfitId: string }[] = [];
  const baseDate = moment().startOf("month"); // 以本月第一天為基準

  for (let i = 0; i < k; i++) {
    const outfitId = `outfit-${i + 1}`;
    const layout = layouts[Math.floor(Math.random() * layouts.length)];
    const itemCount =
      layout === "single" ? 1 : layout === "double" ? 2 : layout === "four-grid" ? 4 : 9;

    // 隨機選取 `itemCount` 件衣物
    const selectedItems = [...demoItems].sort(() => 0.5 - Math.random()).slice(0, itemCount);

    // 添加到 `outfits`
    outfits.push({
      id: outfitId,
      layout,
      items: selectedItems,
    });

    // 為該套衣服分配 `j` 天
    for (let d = 0; d < j; d++) {
      dateMapping.push({
        date: baseDate.clone().add(i * j + d, "days").format("YYYY-MM-DD"),
        outfitId,
      });
    }
  }

  return { outfits, dateMapping };
};
