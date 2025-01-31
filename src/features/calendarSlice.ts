import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface CalendarState {
  currentViewDate: string; // YYYY-MM-DD
  viewMode: "day" | "week" | "month" | "task";
}

const initialState: CalendarState = {
  currentViewDate: moment().format("YYYY-MM-DD"), // 預設為今天
  viewMode: "month", // 預設為月檢視
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setViewDate: (state, action: PayloadAction<string>) => {
      state.currentViewDate = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"day" | "week" | "month" | "task">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewDate, setViewMode } = calendarSlice.actions;
export default calendarSlice.reducer;
