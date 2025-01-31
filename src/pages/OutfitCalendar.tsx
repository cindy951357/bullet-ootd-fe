import { useState, useEffect, } from "react";
import { useDispatch, } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { generateRandomOOTD } from "../utils/genOOTD";
import { setOOTD } from "../features/ootdSlice";
import { useTranslation } from "react-i18next";
import OutfitDetail from "../components/OutfitDetail";
import OOTDGrid from "../components/SingleOutfitGrid";
import { OOTD } from "../types/ootd";


function OutfitCalendar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOutfitId, setselectedOutfitId] = useState<string>("");

  // 以下兩者將互相取交集
  const outfits = useSelector((state: RootState) => state.ootd.outfits);
  const dateMapping = useSelector((state: RootState) => state.ootd.dateMapping);

  // 查找對應的 OOTD 資料
  const getOOTDByDate = (date: string) => {
    // 先用日期找尋 dateMapping 內吻合的
    const mapping = dateMapping.find((mapping) => mapping.date === date);
    if (!mapping) return undefined;
    // 再用 dateMapping 中的 outfitId 欄位找吻合的 outfit
    return outfits.find((ootd) => ootd.id === mapping.outfitId);
  };
  
  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => prev.clone().add(offset, "months"));
  };

  const generateCalendar = () => {
    /** startOfMonth: 取得當月日曆應該從哪一天開始顯示，
     * 確保日曆的第一行從 "本月的第一天所屬的那一週的週日" 開始，
     * 而不只是本月的第一天。 
     */
    const startOfMonth = currentMonth.clone().startOf("month").startOf("week");
    const endOfMonth = currentMonth.clone().endOf("month").endOf("week");
    let currentCalendarDay  = startOfMonth.clone();
    const days = [];

    /** 確保日曆顯示完整的週 */
    /** 從日曆的開始日期 (calendarStartDate) 開始，
     * 逐天遞增，
     * 直到超過當月的最後一天所屬週的最後一天 (endOfMonth)，
     * 並將每一天的 moment 物件存入 days 陣列 
    */
    while (currentCalendarDay.isBefore(endOfMonth, "day")) {
      days.push(currentCalendarDay.clone());
      currentCalendarDay.add(1, "day");
    }
    return days;
  };

  const days = generateCalendar();

  // 初始化 OOTD 資料
  useEffect(() => {
    // 生成 `k` 套衣服，每套衣服分配 `j` 天
    const {outfits, dateMapping} = generateRandomOOTD(12, 3);
    dispatch(setOOTD({outfits, dateMapping})); // 傳遞至 Redux Store
  }, [dispatch]);
  

  return (
    <div id="outfit-calendar" className="p-4">
      <div id="calendar-header" className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="btn-calendar">{t("Previous")}</button>
        <h2 className="text-xl font-bold">{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={() => changeMonth(1)} className="btn-calendar">{t("Next")}</button>
      </div>

      <div id="calendar-grid" className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={`weekday-${index}`} className="text-center font-bold">{day}</div>
        ))}

        {days.map((day, index) => {
          const ootd = getOOTDByDate(day.format("YYYY-MM-DD"));
          return (
          <div
            key={index}
            className="border p-2 flex flex-col items-center cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              setSelectedDate(day);
              setShowDetail(true);
              setselectedOutfitId(ootd?.id ?? "");
            }}
          >
            <span className="text-sm font-bold">{day.format("ddd")}</span>
            <span className="text-sm">{day.format("D")}</span>
            <OOTDGrid ootd={ootd} />
          </div>
        )})}
      </div>

      {showDetail && selectedDate && (
        <OutfitDetail date={selectedDate.format("YYYY-MM-DD")}
          onClose={() => setShowDetail(false)} 
          outfitId={selectedOutfitId} outfits={outfits}
        />
      )}
    </div>
  );
}

export default OutfitCalendar;
