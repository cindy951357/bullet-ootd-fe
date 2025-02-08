import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OOTD, } from "../types/ootd";

interface AllOOTDState {
  ootds: OOTD[];
  dateMapping: { date: string; outfitId: string }[];
}

const initialState: AllOOTDState = {
  ootds: [],
  dateMapping: [],
};


const ootdSlice = createSlice({
  name: "ootd",
  initialState,
  reducers: {
    setOOTDs: (state, action: PayloadAction<AllOOTDState>) => {
      state.ootds = action.payload.ootds;
      state.dateMapping = action.payload.dateMapping;
    },
    addOOTD: (state, action: PayloadAction<OOTD>) => {
      const { id, layout, items } = action.payload;
      state.ootds.push({
        id,
        layout: layout as OOTD["layout"],
        items: items,
      });
    },
  },
});

export const { setOOTD, addOOTD } = ootdSlice.actions;
export default ootdSlice.reducer;
