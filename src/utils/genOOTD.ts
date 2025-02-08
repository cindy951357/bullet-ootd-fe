import { OOTD, OutfitItem, LayoutType } from "../types/ootd";
import moment from "moment";

// 假設的衣物清單
// 假設的衣物清單
const demoItems: OutfitItem[] = [
  { id: "1", imageUrl: "/demo-outfits/top-01.png", category: "Top", subCategory: "T-Shirt", brand: "Brand A", wearCount: 3, rating: 4.5, isSelected: false },
  { id: "2", imageUrl: "/demo-outfits/top-02.png", category: "Top", subCategory: "Blouse", brand: "Brand B", wearCount: 5, rating: 4.2, isSelected: false },
  { id: "3", imageUrl: "/demo-outfits/bottom-01.png", category: "Bottom", subCategory: "Jeans", brand: "Brand C", wearCount: 7, rating: 4.8, isSelected: false },
  { id: "4", imageUrl: "/demo-outfits/bottom-02.png", category: "Bottom", subCategory: "Skirt", brand: "Brand D", wearCount: 2, rating: 3.9, isSelected: false },
  { id: "5", imageUrl: "/demo-outfits/footwear-01.png", category: "Footwear", subCategory: "Sneakers", brand: "Brand E", wearCount: 10, rating: 4.7, isSelected: false },
  { id: "6", imageUrl: "/demo-outfits/footwear-02.png", category: "Footwear", subCategory: "Boots", brand: "Brand F", wearCount: 4, rating: 4.3, isSelected: false },
  { id: "7", imageUrl: "/demo-outfits/accessory-01.png", category: "Accessory", subCategory: "Necklace", brand: "Brand G", wearCount: 8, rating: 4.6, isSelected: false },
  { id: "8", imageUrl: "/demo-outfits/accessory-02.png", category: "Accessory", subCategory: "Bracelet", brand: "Brand H", wearCount: 6, rating: 4.1, isSelected: false },
  { id: "9", imageUrl: "/demo-outfits/outerwear-01.png", category: "Outerwear", subCategory: "Jacket", brand: "Brand I", wearCount: 9, rating: 4.9, isSelected: false },
  { id: "10", imageUrl: "/demo-outfits/outerwear-02.png", category: "Outerwear", subCategory: "Coat", brand: "Brand J", wearCount: 3, rating: 4.0, isSelected: false },
  { id: "11", imageUrl: "/demo-outfits/fullset-01.png", category: "Fullset", subCategory: "Dress", brand: "Brand K", wearCount: 1, rating: 4.4, isSelected: false },
  { id: "12", imageUrl: "/demo-outfits/fullset-02.png", category: "Fullset", subCategory: "Suit", brand: "Brand L", wearCount: 2, rating: 4.2, isSelected: false },
];


// 布局類型
const layouts: LayoutType[] = ["single", "double", "four-grid", "nine-grid"];

// 生成 `k` 套衣服，每套衣服分配 `j` 天
export const generateRandomOOTD = (k: number, j: number) => {
  const outfits: OOTD[] = [];
  const dateMapping: { date: string; outfitId: string }[] = [];
  const baseDate = moment().startOf("month"); // 以本月第一天為基準

  // Fisher-Yates Shuffle 洗牌算法，確保完全隨機排序
  // 使用泛型：
  // 允許函數適用於任何類型的陣列，而不僅僅是 string 或 any。
  // <T> 是 TypeScript 的泛型語法，表示 array 是類型為 T[] 的陣列
  const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // 手動交換
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };  
  

  for (let i = 0; i < k; i++) {
    const outfitId = `outfit-${i + 1}`;
    const layout = layouts[Math.floor(Math.random() * layouts.length)];
    const itemCount =
      layout === "single" ? 1 : layout === "double" ? 2 : layout === "four-grid" ? 4 : 9;

    // 從 demoItems 陣列中隨機選擇 itemCount 個元素，並返回一個新的陣列 selectedItems
    // 這一部分的作用是 對陣列進行隨機排序。
    const selectedItems = [...demoItems].sort(() => 0.5 - Math.random()).slice(0, itemCount);

    // 添加到 `outfits`
    outfits.push({
      id: outfitId,
      layout,
      items: selectedItems,
    });

    // 此迴圈產生每套衣服各自連續出現j次
    // 原本本函數參數是指，為該套衣服分配 `j` 天
    for (let d = 0; d < j; d++) {
      // 說明 i * j + d：
      // i：當前迭代的衣服索引（表示第幾套衣服）。
      // j：每套衣服被分配的天數。
      // d：當前分配的天數（表示第幾天）。
      // 計算結果：這個表達式計算出當前日期距離 baseDate 的偏移量（以天數為單位）。
      dateMapping.push({
        date: baseDate.clone().add(i * j + d, "days").format("YYYY-MM-DD"),
        outfitId,
      });
    }
    // 打亂剛才有序的順序為隨機
    shuffleArray(dateMapping);

  }

  return { outfits, dateMapping };
};
