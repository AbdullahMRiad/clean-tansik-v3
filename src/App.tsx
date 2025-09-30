import { createContext, useEffect, useState } from "react";
import Decimal from "decimal.js";

import type { College, Gender, SearchType, Year } from "../types/types";

import CardsContainer from "./components/cards";
import DataSelector from "./components/filters/dataselect";
import FiltersSection from "./components/filters/filters";
import TagsSection from "./components/filters/tags";
import StatsSection from "./components/stats";

import _2025b from "../data/json/2025b.json";

export const AppContext = createContext<{
    gender: Gender;
    setGender: React.Dispatch<React.SetStateAction<Gender>>;
    year: Year;
    setYear: React.Dispatch<React.SetStateAction<Year>>;
    sourceData: College[];
    setSourceData: React.Dispatch<React.SetStateAction<College[]>>;
    filteredData: College[];
    setFilteredData: React.Dispatch<React.SetStateAction<College[]>>;
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
}>(null!);

function App() {
    const [gender, setGender] = useState<Gender>("boys");
    const [year, setYear] = useState<Year>(2025);
    const [sourceData, setSourceData] = useState<College[]>(
        _2025b as College[],
    );
    const [filteredData, setFilteredData] = useState<College[]>(
        _2025b as College[],
    );
    const [schoolScore, setSchoolScore] = useState<number>(0);
    const [quduratScore, setQuduratScore] = useState<number>(0);
    const [collegeName, setCollegeName] = useState<string>("");
    const [limit, setLimit] = useState<number>(0);
    const [searchType, setSearchType] = useState<SearchType>("score");

    useEffect(() => {
        if (searchType === "score") {
            setFilteredData(
                sourceData.filter((v) => {
                    const schoolPart = new Decimal(schoolScore).div(2);
                    const quduratPart = new Decimal(quduratScore).div(2);
                    const total = schoolPart.plus(quduratPart).times(4.1);
                    return Decimal(v.الدرجة) <= total;
                }),
            );
        }
    }, [schoolScore, quduratScore, searchType]);
    useEffect(() => {
        console.log(filteredData);
        if (searchType === "name") {
            setFilteredData(
                sourceData.filter((v) => {
                    if (collegeName === "") {
                        return parseFloat(v.الدرجة) <= limit;
                    } else {
                        return (
                            v.الكلية.includes(collegeName) &&
                            parseFloat(v.الدرجة) <= limit
                        );
                    }
                }),
            );
        }
    }, [collegeName, limit, searchType]);

    return (
        <AppContext.Provider
            value={{
                gender,
                setGender,
                year,
                setYear,
                sourceData,
                setSourceData,
                filteredData,
                setFilteredData,
                schoolScore,
                setSchoolScore,
                quduratScore,
                setQuduratScore,
                collegeName,
                setCollegeName,
                limit,
                setLimit,
                searchType,
                setSearchType,
            }}>
            <div className="flex w-full flex-col">
                <header className="panel p-3! text-center text-3xl font-bold">
                    تنسيق الجامعات المصرية للشهادة السعودية
                </header>
                <DataSelector />
                <FiltersSection />
                <TagsSection />
                <StatsSection />
                <CardsContainer />
            </div>
        </AppContext.Provider>
    );
}

export default App;
