import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./features/imageSlice";
import ootdReducer from "./features/ootdSlice";
import calendarReducer from "./features/calendarSlice";


export const store = configureStore({
  reducer: {
    image: imageReducer,
    ootd: ootdReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
