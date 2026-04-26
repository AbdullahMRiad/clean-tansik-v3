export type College = {
    الكلية: string;
    الدرجة: string;
    المجال: string;
    الأيقونة: string;
    النوع: "جامعة" | "معهد" | "انتساب" | "غير مصنف";
};

export type Gender = "boys" | "girls";

export type Year = 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025;

export type Stats = {
    totalColleges: number;
    filteredColleges: number;
    availableColleges: number;
    unavailableColleges: number;
};

export type Context = {
    gender: Gender;
    setGender: React.Dispatch<React.SetStateAction<Gender>>;
    year: Year;
    setYear: React.Dispatch<React.SetStateAction<Year>>;
    sourceData: College[];
    setSourceData: React.Dispatch<React.SetStateAction<College[]>>;
    finalData: College[];
    setFinalData: React.Dispatch<React.SetStateAction<College[]>>;
    schoolScore: number;
    setSchoolScore: React.Dispatch<React.SetStateAction<number>>;
    quduratScore: number;
    setQuduratScore: React.Dispatch<React.SetStateAction<number>>;
    collegeName: string;
    setCollegeName: React.Dispatch<React.SetStateAction<string>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    types: string[];
    setTypes: React.Dispatch<React.SetStateAction<string[]>>;
    availableTags: string[];
    setAvailableTags: React.Dispatch<React.SetStateAction<string[]>>;
    availableTypes: string[];
    setAvailableTypes: React.Dispatch<React.SetStateAction<string[]>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isOptionsOpen: boolean;
    setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    stats: Stats;
    setStats: React.Dispatch<React.SetStateAction<Stats>>;
};
