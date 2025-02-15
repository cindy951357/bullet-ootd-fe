import { OutfitItem } from "../types/ootd";

export const MOCK_ITEMS:OutfitItem[] = [
    {
        id: "0001",
        imageUrl: "/demo-outfits/top-01.png",
        category: "Top",
        subCategory: "Blouse",
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
        rating: 7,
        wearCount: 4,
        isSelected: false,
        styles: ["casual", "formal",]
    }
];


export const CLOTH_TYPES = ["Top", "Bottom", "Outerwear", "Footwear", "Accessories"];
export const STYLES = ["casual", "formal", "sporty", "vintage", "minimal", "chic"];