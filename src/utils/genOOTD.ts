import { MOCK_ITEMS } from "../mockData";
import { OOTD, LayoutType } from "../types/ootd";
import moment from "moment";

// 布局類型
const layouts: LayoutType[] = ["single", "double", "four-grid", "nine-grid"];

// 生成 `k` 套衣服，每套衣服分配 `j` 天
export const generateRandomOOTD = (k: number, j: number) => {
  const outfits: OOTD[] = [];
  const dateMapping: { date: string; outfitId: string }[] = [];
  const baseDate = moment().startOf("week"); // 以本月第一天為基準

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
    const selectedItems = [...MOCK_ITEMS].sort(() => 0.5 - Math.random()).slice(0, itemCount);

    // 添加到 `outfits`
    outfits.push({
      id: outfitId,
      layout,
      items: selectedItems,
    });

    // 此迴圈產生每套衣服各自連續出現j次
    // 原本本函數參數是指，為該套衣服分配 `j` 天
    for (let d = 0; d < j; d += 2) {
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
