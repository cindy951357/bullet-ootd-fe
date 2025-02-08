import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MOCK_ITEMS, } from "../mockData";
import { OutfitItem } from "../types/ootd";
interface ImageState {
  images: string[]; // 存圖片的 URL
}

const initialState: ImageState  & { items: OutfitItem[] }  = {
  images: [],
  items: MOCK_ITEMS,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
});

export const { addImage, removeImage, clearImages } = imageSlice.actions;
export default imageSlice.reducer;
