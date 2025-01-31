import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./features/imageSlice";
import ootdReducer from "./features/ootdSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    ootd: ootdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
