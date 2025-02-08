export type LayoutType = "single" | "double" | "four-grid" | "nine-grid";

export interface SimpleOutfitItem {
  id: string;
  imageUrl: string;
  isSelected: boolean;
}

export interface OutfitItem extends SimpleOutfitItem {
  category: "Top" | "Bottom" | "Footwear" | "Accessory" | "Outerwear" | "Fullset";
  subCategory: "T-shirt" | string;
  brand: string;
  rating: number;
  wearCount: number;
}

export interface OOTD {
  id: string;
  layout: LayoutType;
  items: SimpleOutfitItem[];
}
