// 大致上有左半跟右半，寬度約是一比二
// 有兩種filters，第一是衣服類型過濾 top, bottom, .....，第二式風格過濾，
// 按下標籤立刻篩選，不用經過submit按鈕
// 若任何標籤都沒選，則預設顯示所有衣服清單在右方
import { useState, useMemo, } from "react";
import { useTranslation, } from "react-i18next";
import { MOCK_ITEMS, CLOTH_TYPES, STYLES, } from "../mockData";
import { OutfitItem } from "../types/ootd";

function ViewItems() {
  const { t } = useTranslation();
//   const allItems = useSelector((state: RootState) => state.clothes.items);
  const allItems = MOCK_ITEMS;
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  // 切換類型篩選
  const toggleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // 切換風格篩選
  const toggleStyleFilter = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // 根據選擇的標籤篩選衣物清單
  const filteredItems = useMemo(() => {
    if (selectedTypes.length === 0 && selectedStyles.length === 0) {
      return allItems; // 無篩選條件則顯示所有衣物
    }
    return allItems.filter((item: OutfitItem) =>
      (selectedTypes.length === 0 || selectedTypes.includes(item.category)) &&
      (selectedStyles.length === 0 || selectedStyles.some((s) => item.styles.includes(s)))
    );
  }, [allItems, selectedTypes, selectedStyles]);

  return (
    <div className="flex w-full h-screen p-4">
      {/* 左側篩選區域 */}
      <div className="w-1/3 min-w-[200px] p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-2">{t("Filter.ClothType")}</h2>
        <div className="flex flex-wrap gap-2">
          {CLOTH_TYPES.map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-lg border ${
                selectedTypes.includes(type) ? "bg-primary text-on-secondary" : "bg-gray-100"
              }`}
              onClick={() => toggleTypeFilter(type)}
            >
              {t(`ClothType.${type}`)}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-4 mb-2">{t("Filter.Style")}</h2>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((style) => (
            <button
              key={style}
              className={`px-3 py-1 rounded-lg border ${
                selectedStyles.includes(style) ? "bg-secondary text-on-secondary" : "bg-gray-100"
              }`}
              onClick={() => toggleStyleFilter(style)}
            >
              {t(`Style.${style}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 右側衣物清單 */}
      <div className="w-2/3 p-4 overflow-y-scroll h-full">
        <h2 className="text-xl font-bold mb-4">{t("ClothList.Title")}</h2>
        <div className="grid grid-cols-3 gap-4">
          {filteredItems.map((item:OutfitItem) => (
            <div key={item.id} className="border p-2 rounded-lg shadow">
              <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewItems