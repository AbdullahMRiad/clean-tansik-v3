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

export type Context = {
    gender: Gender;
    setGender: React.Dispatch<React.SetStateAction<Gender>>;
    year: Year;
    setYear: React.Dispatch<React.SetStateAction<Year>>;
    sourceData: College[];
    setSourceData: React.Dispatch<React.SetStateAction<College[]>>;
    filteredData: College[];
    setFilteredData: React.Dispatch<React.SetStateAction<College[]>>;
    taggedData: College[];
    setTaggedData: React.Dispatch<React.SetStateAction<College[]>>;
    schoolScore: number;
    setSchoolScore: React.Dispatch<React.SetStateAction<number>>;
    quduratScore: number;
    setQuduratScore: React.Dispatch<React.SetStateAction<number>>;
    collegeName: string;
    setCollegeName: React.Dispatch<React.SetStateAction<string>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    searchType: SearchType;
    setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    types: string[];
    setTypes: React.Dispatch<React.SetStateAction<string[]>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
