import { useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import OutfitDetail from "../components/OutfitDetail";

function OutfitCalendar() {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [showDetail, setShowDetail] = useState(false);

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

        {days.map((day, index) => (
          <div
            key={index}
            className="border p-2 flex flex-col items-center cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              setSelectedDate(day);
              setShowDetail(true);
            }}
          >
            <span className="text-sm font-bold">{day.format("ddd")}</span>
            <span className="text-sm">{day.format("D")}</span>
            <img
              src={`/demo-outfits/top-0${(index % 2) + 1}.png`}
              alt="OOTD"
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      {showDetail && selectedDate && (
        <OutfitDetail date={selectedDate} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
}

export default OutfitCalendar;
