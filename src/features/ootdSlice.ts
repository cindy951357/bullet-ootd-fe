import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OOTD } from "../types/ootd";

interface OOTDState {
  outfits: OOTD[];
  dateMapping: { date: string; outfitId: string }[];
}

const initialState: OOTDState = {
  outfits: [],
  dateMapping: [],
};


const ootdSlice = createSlice({
  name: "ootd",
  initialState,
  reducers: {
    setOOTD: (state, action: PayloadAction<OOTDState>) => {
      state.outfits = action.payload.outfits;
      state.dateMapping = action.payload.dateMapping;
    },
  },
});

export const { setOOTD } = ootdSlice.actions;
export default ootdSlice.reducer;
