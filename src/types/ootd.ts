export type LayoutType = "single" | "double" | "four-grid" | "nine-grid";

export interface SimpleOutfitItem {
  id: string;
  imageUrl: string;
  isSelected: boolean;
}

export interface OutfitItem extends SimpleOutfitItem {
  category: "Top" | "Bottom" | "Footwear" | "Accessory" | "Outerwear" | "Fullset";
  subCategory: "T-shirt" | string;
  name: string;
  brand: string;
  rating: number;
  wearCount: number;
  styles: string[];
}

export interface OOTD {
  id: string;
  layout: LayoutType;
  items: SimpleOutfitItem[];
}
