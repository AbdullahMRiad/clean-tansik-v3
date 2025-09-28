export type College = {
    الكلية: string;
    الدرجة: string;
    المجال: string;
    الأيقونة: string;
    النوع: "جامعة" | "معهد" | "انتساب" | "غير مصنف";
};

export type SearchType = "name" | "score";

export type Gender = "boys" | "girls";

export type Year = 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025;
