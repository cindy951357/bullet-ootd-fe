export type LayoutType = "single" | "double" | "four-grid" | "nine-grid";

export interface OutfitItem {
  id: string;
  image: string;
  category: "top" | "bottom" | "footwear" | "accessory" | "outerwear" | "fullset";
}

export interface OOTD {
  id: string;
  layout: LayoutType;
  items: OutfitItem[];
}
