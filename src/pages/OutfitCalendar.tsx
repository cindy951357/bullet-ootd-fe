import { useState, useEffect, } from "react";
import { useDispatch, } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "../store";
import { generateRandomOOTD } from "../utils/genOOTD";
import { setOOTD } from "../features/ootdSlice";
import { setViewDate, setViewMode } from "../features/calendarSlice";

import OutfitDetail from "../components/OutfitDetail";
import OOTDGrid from "../components/OOTDOutfitGrid";


function OutfitCalendar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [_, setCurrentTravDate] = useState<moment.Moment>(moment());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>("");

  const currentViewDate = useSelector((state: RootState) => state.calendar.currentViewDate);
  const viewMode = useSelector((state: RootState) => state.calendar.viewMode);

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
  

  const traverseCalendar = (offset: number) => {
    switch (viewMode) {
      case "day":
        setCurrentTravDate(prev => {
          const updatedDate = prev.clone().add(offset, "days");
          dispatch(setViewDate(updatedDate.format("YYYY-MM-DD")));
          return updatedDate;
        });
        break;
      case "week":
        setCurrentTravDate(prev => {
          const updatedDate = prev.clone().add(offset, "weeks").startOf("week");
          dispatch(setViewDate(updatedDate.format("YYYY-MM-DD")));
          return updatedDate;
        });
        break;
      case "month":
        setCurrentMonth(prev => {
          const updatedDate = prev.clone().add(offset, "months").startOf("month");
          dispatch(setViewDate(updatedDate.format("YYYY-MM-DD")));
          return updatedDate;
        });
        break;
      case "task":
        console.log("Task view does not affect calendar traversal yet.");
        break;
      default:
        console.warn("Unsupported viewMode:", viewMode);
    }
  };

  
  const generateCalendar = (weekStartDay = 0) => {
    // 當月第一天
    const firstDayOfMonth = currentMonth.clone().startOf("month");
    
    // 計算日曆起始日期
    const startOfMonth = firstDayOfMonth.clone().startOf("week").add(weekStartDay, "days");
  
    // 計算日曆結束日期
    const lastDayOfMonth = currentMonth.clone().endOf("month");
    // 計算當月日曆的結束日期，確保它包含「當月最後一天所屬的一整週」
    const endOfMonth = lastDayOfMonth.clone().endOf("week").add(weekStartDay, "days");
  
    // 確保日曆包含完整的天數（30, 36 或 42 天）
    const totalDays = Math.ceil(endOfMonth.diff(startOfMonth, "days") / 7) * 7;
    /* 將總天數除以 7，計算需要幾週來涵蓋這些天數。
      這可能是一個小數（例如：如果有 38 天，則結果是 5.4286 週）。
      Math.ceil(... / 7)
      使用 Math.ceil 將週數向上取整，確保有足夠的週數來顯示完整的日曆結構。
      例如：如果是 5.4286 週，取整後就是 6 週。
      將取整後的週數乘以 7，得到需要顯示的天數（7 的倍數）。
      例如：6 週 × 7 天 = 42 天。
    */
  
    const days = [];
    let currentCalendarDay = startOfMonth.clone();
  
    /** 逐天遞增，
     * 直到超過當月的最後一天所屬週的最後一天 (endOfMonth)，
     * 並將每一天的 moment 物件存入 days 陣列 
    */
    for (let i = 0; i < totalDays; i++) {
      days.push(currentCalendarDay.clone());
      currentCalendarDay.add(1, "day");
    }
  
    return days;
  };

  // 初始化 OOTD 資料
  useEffect(() => {
    // 生成 `k` 套衣服，每套衣服分配 `j` 天
    const {outfits, dateMapping} = generateRandomOOTD(12, 1);
    dispatch(setOOTD({outfits, dateMapping})); // 傳遞至 Redux Store
  }, [dispatch]);
  

  return (
    <div id="outfit-calendar" className="p-4">
      <div id="calendar-header" className="flex justify-between items-center mb-4
        border-b border-primary border-solid 
      ">
        <button onClick={() => traverseCalendar(-1)} className="btn-calendar">{t("Previous")}</button>
        <div id="cur-and-now" className="flex flex-col">
          <h2 id="cur-month" className="text-gray-500 text-xl font-bold text-center px-2 border-b border-b-primary">{currentMonth.format("MMMM YYYY")}</h2>
          <h2 id="cur-view-date" className="text-gray-500 text-s font-bold text-center">
            {moment(currentViewDate).format("YYYY-MM-DD")}
          </h2>
        </div>        
        <button onClick={() => traverseCalendar(1)} className="btn-calendar">{t("Next")}</button>
      </div>
      {/** 切換檢視模式 */}
      <div id="btn-group-change-view-mode" className="flex gap-2 mb-4">
        <button onClick={() => dispatch(setViewMode("day"))} className="btn-calendar">{t("ViewMode.Day")}</button>
        <button onClick={() => dispatch(setViewMode("week"))} className="btn-calendar">{t("ViewMode.Week")}</button>
        <button onClick={() => dispatch(setViewMode("month"))} className="btn-calendar">{t("ViewMode.Month")}</button>
        <button onClick={() => dispatch(setViewMode("task"))} className="btn-calendar">{t("ViewMode.Task")}</button>
      </div>

      {/* 根據 viewMode 渲染不同的日曆 */}
      {viewMode === "day" && (
        <div className="day-mode flex w-full justify-center">
          <div className="max-w-1/3 min-w-[200px] border-primary border-solid p-4 flex flex-col"
            onClick={() => {
              const ootd = getOOTDByDate(currentViewDate);
              setSelectedDate(moment(currentViewDate, "YYYY-MM-DD"));
              setSelectedOutfitId(ootd?.id ?? "");
              setShowDetail(!!ootd);
            }}
          >
            <h3 className="font-bold">{moment(currentViewDate).format("dddd, YYYY-MM-DD")}</h3>
            <OOTDGrid ootd={getOOTDByDate(currentViewDate)} />
          </div> 
        </div>        
      )}

      {viewMode === "week" && (
        <div className="grid grid-cols-7 sm:gap-0 gap-1 lg:gap-2">
          {[...Array(7)].map((_, i) => {
            const weekDate = moment(currentViewDate).startOf("week").add(i, "days").format("YYYY-MM-DD");
            const ootd = getOOTDByDate(weekDate);
            return (
              <div key={weekDate} className="w_[100px] aspect-square border-primary border-solid sm:p-1 md:p-2 flex
                flex-col items-center"
                onClick={() => {
                  setSelectedDate(moment(weekDate, "YYYY-MM-DD"));
                  setSelectedOutfitId(ootd?.id ?? "");
                  setShowDetail(!!ootd);
                }}
              >
                <span className="text-sm font-bold">{moment(weekDate).format("ddd")}</span>
                <span className="text-sm font-bold">{moment(weekDate).format("D")}</span>
                <OOTDGrid ootd={ootd} />
              </div>
            );
          })}
        </div>
      )}

      {viewMode === "month" && (
        <div className="grid grid-cols-7 sm:gap-[1px] gap-1 lg:gap-2">
          {/** gap 要有RWD */}
          {generateCalendar(1).map((day, _) => {  // 1 表示從週一開始
            const date = day.format("YYYY-MM-DD");
            const ootd = getOOTDByDate(date);
            return (
              <div
                key={date}
                className="w_[100px] aspect-square border-primary border-solid
                sm:p-1 md:p-2
                flex flex-col items-center"
                onClick={() => {
                  setSelectedDate(moment(date, "YYYY-MM-DD"));
                  setSelectedOutfitId(ootd?.id ?? "");
                  setShowDetail(!!ootd);
                }}
              >
                <span className="text-sm font-bold">{day.format("D")}</span>
                <OOTDGrid ootd={ootd} />
              </div>
            );
          })}
        </div>
      )}

      {viewMode === "task" && (
        <div>
          <h3 className="font-bold">{t("ViewMode.Task")}</h3>
          {/* 這裡可以改為根據 Redux 內的 Task 資料顯示清單 */}
          <p className="text-gray-500">{t("TaskViewPlaceholder")}</p>
        </div>
      )}

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
