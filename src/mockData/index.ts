import { OutfitItem } from "../types/ootd";

export const MOCK_ITEMS:OutfitItem[] = [
    {
        id: "0001",
        imageUrl: "/demo-outfits/top-01.png",
        category: "Top",
        subCategory: "Blouse",
        name: "珍珠抓皺白上衣",
        brand: "Chic",
        rating: 9,
        wearCount: 5,
        isSelected: false,
        styles: ["chic", ]
    },
    {
        id: "xxx2",
        imageUrl: "/demo-outfits/top-02.png",
        category: "Top",
        subCategory: "Blouse",
        brand: "Lady",
        name: "裸粉色氣質上衣",
        rating: 10,
        wearCount: 10,
        isSelected: false,
        styles: ["casual", "formal",]
    },
    {
        id: "0003",
        imageUrl: "/demo-outfits/bottom-01.png",
        category: "Bottom",
        subCategory: "Skirt",
        brand: "Cocodeal",
        name: "熊熊色直坑紋溫暖長裙",
        rating: 7,
        wearCount: 4,
        isSelected: false,
        styles: ["casual", "formal",]
    },
  { id: "4", imageUrl: "/demo-outfits/bottom-02.png", category: "Bottom", subCategory: "Skirt", name: "", brand: "Brand D", wearCount: 2, rating: 3.9, isSelected: false, styles:[""] },
  { id: "5", imageUrl: "/demo-outfits/footwear-01.png", category: "Footwear", subCategory: "Sneakers", name: "", brand: "Brand E", wearCount: 10, rating: 4.7, isSelected: false, styles:[""] },
  { id: "6", imageUrl: "/demo-outfits/footwear-02.png", category: "Footwear", subCategory: "Boots", name: "", brand: "Brand F", wearCount: 4, rating: 4.3, isSelected: false, styles:[""] },
  { id: "7", imageUrl: "/demo-outfits/accessory-01.png", category: "Accessory", subCategory: "Necklace", name: "", brand: "Brand G", wearCount: 8, rating: 4.6, isSelected: false, styles:[""] },
  { id: "8", imageUrl: "/demo-outfits/accessory-02.png", category: "Accessory", subCategory: "Bracelet", name: "", brand: "Brand H", wearCount: 6, rating: 4.1, isSelected: false, styles:[""] },
  { id: "9", imageUrl: "/demo-outfits/outerwear-01.png", category: "Outerwear", subCategory: "Jacket", name: "", brand: "Brand I", wearCount: 9, rating: 4.9, isSelected: false, styles:[""] },
  { id: "10", imageUrl: "/demo-outfits/outerwear-02.png", category: "Outerwear", subCategory: "Coat", name: "", brand: "Brand J", wearCount: 3, rating: 4.0, isSelected: false, styles:[""] },
  { id: "11", imageUrl: "/demo-outfits/fullset-01.png", category: "Fullset", subCategory: "Dress", name: "", brand: "Brand K", wearCount: 1, rating: 4.4, isSelected: false, styles:[""] },
  { id: "12", imageUrl: "/demo-outfits/fullset-02.png", category: "Fullset", subCategory: "Suit", name: "", brand: "Brand L", wearCount: 2, rating: 4.2, isSelected: false, styles:[""] },
];

export const CLOTH_TYPES = ["Top", "Bottom", "Outerwear", "Footwear", "Accessories"];
export const STYLES = ["casual", "formal", "sporty", "vintage", "minimal", "chic"];