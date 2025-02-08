import { useState, useEffect, } from "react";
import { useDispatch, } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "../store";
import { generateRandomOOTD } from "../utils/genOOTD";
import { setOOTDs } from "../features/ootdSlice";
import { setViewDate, setViewMode } from "../features/calendarSlice";

import OutfitDetail from "../components/OutfitDetail";
import OOTDGrid from "../components/OOTDOutfitGrid";
import { OOTD } from "../types/ootd";

// import { MAX_CALENDAR_CELL_HEIGHT, } from "../constant";

const TodayWeatherComponent = () => {
  return (
    <div className={`weather-section w-full h-full flex
      sm:max-w-[15vw] flex-col
      bg-yellow-50 p-4 rounded-lg shadow-md`}>
      <h3 className="text-xl font-bold mb-2">Today's Weather</h3>
      <p className="text-gray-600">Sunny☀️, 25°C</p>
    </div>
  )
}

const TodayEventComponent = () => {
  return (
    <div className="event-section w-full h-full flex
      sm:max-w-[15vw] flex-col
      bg-yellow-50 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Today's Event</h3>
      <p className="text-gray-600">Casual Outing</p>
    </div>
  )}

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

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // 控制螢幕大小

  // 以下兩者將互相取交集
  const outfits = useSelector((state: RootState) => state.ootd.ootds);
  const dateMapping = useSelector((state: RootState) => state.ootd.dateMapping);

  // 查找對應的 OOTD 資料
  const getOOTDByDate = (date: string) => {
    // 先用日期找尋 dateMapping 內吻合的
    const mapping = dateMapping.find((mapping) => mapping.date === date);
    if (!mapping) return undefined;
    // 再用 dateMapping 中的 outfitId 欄位找吻合的 outfit
    return outfits.find((ootd: OOTD) => ootd.id === mapping.outfitId);
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
    
    // 日曆起始日期
    const startOfMonth = firstDayOfMonth.clone().startOf("week").add(weekStartDay, "days");
  
    // 日曆結束日期
    // const lastDayOfMonth = currentMonth.clone().endOf("month");
    // 當月日曆的結束日期
    // const endOfMonth = lastDayOfMonth.clone().endOf("week").add(weekStartDay, "days");
  
    // 確保日曆包含完整的天數（30, 36 或 42 天）
    const totalDays = 42; //Math.ceil(endOfMonth.diff(startOfMonth, "days") / 7) * 7;
    /* 將總天數除以 7，計算需要幾週來涵蓋這些天數。
      這可能是一個小數（例如：如果有 38 天，則結果是 5.4286 週）。
      Math.ceil(... / 7)
      使用 Math.ceil 將週數向上取整，確保有足夠的週數。
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

  useEffect(() => {
    const handleResize = () => {
      // 檢測螢幕是否小於 sm 尺寸 (640px)
      setIsSmallScreen(window.matchMedia("(max-width: 640px)").matches);
    };

    // 初始化檢測
    handleResize();

    // 添加事件監聽
    window.addEventListener("resize", handleResize);

    // 清除事件監聽
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 初始化 OOTD 資料
  useEffect(() => {
    // 生成 `k` 套衣服，每套衣服分配 `j` 天
    const {outfits, dateMapping} = generateRandomOOTD(12, 1);
    dispatch(setOOTDs({ootds: outfits, dateMapping})); // 傳遞至 Redux Store
  }, [dispatch]);
  

  return (
    <div id="outfit-calendar-page" className="three-sections w-[95vw] sm:w-full h-full
      flex flex-col gap-2
      sm:flex-row sm:gap-1 justify-center items-start
      mb-2 sm:mb-2
      px-[1px] sm:px-1">
      {!isSmallScreen && <TodayWeatherComponent />}
      <div id="main-calendar" className="w-full h-full max-w-[95vw]
        sm:max-w-[566px] sm:max-h-[430px]
          flex flex-col flex-1
          justify-start items-start pt-[2px]">
            <div className="calendar-outer-header w-full flex justify-between border-b border-b-primary">
              <div id="calendar-inner-header" className="flex justify-between items-center pb-[2px] mb-[2px]
              ">
                <button onClick={() => traverseCalendar(-1)} className="btn-calendar text-xs md:text-base">
                  {t("Previous")}
                  </button>
                <div id="cur-and-now" className="flex flex-col">
                  <h2 id="cur-view-date" className="text-gray-500 text-xs sm:text-s font-bold text-center mx-1">
                    {moment(currentViewDate).format("YYYY-MM-DD")}
                  </h2>
                </div>        
                <button onClick={() => traverseCalendar(1)} className="btn-calendar text-xs md:text-base">{t("Next")}</button>
              </div>
              {/** 切換檢視模式 */}
              <div id="btn-group-change-view-mode" className="flex justify-center gap-[1px] mb-[2px] pb-[2px]">
                <button onClick={() => dispatch(setViewMode("day"))} className="btn-calendar">{t("ViewMode.Day")}</button>
                <button onClick={() => dispatch(setViewMode("week"))} className="btn-calendar">{t("ViewMode.Week")}</button>
                <button onClick={() => dispatch(setViewMode("month"))} className="btn-calendar">{t("ViewMode.Month")}</button>
                <button onClick={() => dispatch(setViewMode("task"))} className="btn-calendar">{t("ViewMode.Task")}</button>
              </div>
            </div>    

            {/* 根據 viewMode 渲染不同的日曆 */}
            {viewMode === "day" && (
              <div className="day-mode flex w-full justify-center">
                <div className="max-w-full border-primary border-solid flex flex-col"
                  onClick={() => {
                    const ootd = getOOTDByDate(currentViewDate);
                    setSelectedDate(moment(currentViewDate, "YYYY-MM-DD"));
                    setSelectedOutfitId(ootd?.id ?? "");
                    setShowDetail(!!ootd);
                  }}
                >
                  <OOTDGrid ootd={getOOTDByDate(currentViewDate)} selectedItems={undefined} isEditing={false}/>
                </div> 
              </div>        
            )}

            {viewMode === "week" && (
              <div className="grid grid-cols-7 md:w-full sm:gap-0 gap-[1px]">
                {[...Array(7)].map((_, i) => {
                  const weekDate = moment(currentViewDate).startOf("week").add(i, "days").format("YYYY-MM-DD");
                  const ootd = getOOTDByDate(weekDate);
                  return (
                    <div key={weekDate} className="cell w-full md:max-w-full aspect-square border-primary border-solid
                      sm:p-[1px]  lg:p-2 flex
                      flex-col items-center"
                      onClick={() => {
                        setSelectedDate(moment(weekDate, "YYYY-MM-DD"));
                        setSelectedOutfitId(ootd?.id ?? "");
                        setShowDetail(!!ootd);
                      }}
                    >
                      <span className="text-sm font-bold">{moment(weekDate).format("ddd")}</span>
                      <span className="text-sm font-bold">{moment(weekDate).format("D")}</span>
                      <OOTDGrid ootd={ootd} selectedItems={undefined} isEditing={false}/>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === "month" && (
              <div className="grid grid-cols-7 md:w-full md:max-w-full sm:gap-0 gap-[1px] lg:gap-1">
                {/** gap 要有RWD */}
                {generateCalendar(1).map((day, _) => {  // 1 表示從週一開始，不是從星期日
                  const date = day.format("YYYY-MM-DD");
                  const ootd = getOOTDByDate(date);
                  return (
                    <div
                      key={date}
                      className="cell w-full aspect-square border-primary border-solid
                      sm:p-[1px] lg:p-2
                      flex flex-col items-center"
                      onClick={() => {
                        setSelectedDate(moment(date, "YYYY-MM-DD"));
                        setSelectedOutfitId(ootd?.id ?? "");
                        setShowDetail(!!ootd);
                      }}
                    >
                      <span className="text-sm font-bold">{day.format("D")}</span>
                      <OOTDGrid ootd={ootd} selectedItems={undefined} isEditing={false}/>
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
      </div>
      {isSmallScreen && <TodayWeatherComponent />} 
      <TodayEventComponent/>

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
