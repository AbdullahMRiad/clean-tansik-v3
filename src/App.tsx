import { createContext, useEffect, useState } from "react";
import Decimal from "decimal.js";

import type {
    College,
    Context,
    Gender,
    SearchType,
    Year,
} from "../types/types";

import CardsContainer from "./components/cards";
import DataSelector from "./components/filters/dataselect";
import FiltersSection from "./components/filters/filters";
import TagsSection from "./components/filters/tags";
import StatsSection from "./components/stats";

import _2025b from "../data/json/2025b.json";
import Header from "./components/header";

export const AppContext = createContext<Context>(null!);

function App() {
    const params = new URLSearchParams(window.location.search);

    const [gender, setGender] = useState<Gender>(
        (params.get("gender") as Gender) || "boys",
    );
    const [year, setYear] = useState<Year>(
        (parseInt(params.get("year") as string) as Year) || 2025,
    );
    const [sourceData, setSourceData] = useState<College[]>(
        _2025b as College[],
    );
    const [filteredData, setFilteredData] = useState<College[]>(
        _2025b as College[],
    );
    const [taggedData, setTaggedData] = useState<College[]>(
        _2025b as College[],
    );
    const [schoolScore, setSchoolScore] = useState<number>(
        parseInt(params.get("school") as string) || 100,
    );
    const [quduratScore, setQuduratScore] = useState<number>(
        parseInt(params.get("qudurat") as string) || 100,
    );
    const [collegeName, setCollegeName] = useState<string>(
        params.get("college") || "",
    );
    const [limit, setLimit] = useState<number>(
        parseInt(params.get("limit") as string) || 410,
    );
    const [searchType, setSearchType] = useState<SearchType>(
        (params.get("search") as SearchType) || "score",
    );
    const [tags, setTags] = useState<string[]>(
        params.get("tags")?.split(",") || [],
    );
    const [types, setTypes] = useState<string[]>(
        params.get("types")?.split(",") || [],
    );
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) return saved === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

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
        } else if (searchType === "name") {
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
        setTaggedData(
            filteredData.filter((v) => {
                if (tags.length === 0) return true;
                return tags.includes(v.المجال);
            }),
        );
        setTaggedData(
            filteredData.filter((v) => {
                if (types.length === 0) return true;
                return types.includes(v.النوع);
            }),
        );
        document.querySelector("html")!.dataset.theme =
            params.get("gender") || "boys";
    }, []);
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
    }, [schoolScore, quduratScore, searchType, sourceData]);
    useEffect(() => {
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
    }, [collegeName, limit, searchType, sourceData]);
    useEffect(() => {
        setTaggedData(
            filteredData.filter((v) => {
                if (tags.length === 0) return true;
                return tags.includes(v.المجال);
            }),
        );
    }, [tags, filteredData]);
    useEffect(() => {
        setTaggedData(
            filteredData.filter((v) => {
                if (types.length === 0) return true;
                return types.includes(v.النوع);
            }),
        );
    }, [types, filteredData]);
    useEffect(() => {
        document.documentElement.dataset.themeMode = darkMode
            ? "dark"
            : "light";
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);
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
                tags,
                setTags,
                types,
                setTypes,
                taggedData,
                setTaggedData,
                darkMode,
                setDarkMode,
            }}>
            <div className="flex w-full flex-col md:flex-row">
                <div
                    id="modifiers"
                    className="md:h-screen md:max-w-sm md:overflow-y-scroll">
                    <Header />
                    <DataSelector />
                    <FiltersSection />
                    <TagsSection />
                    <StatsSection />
                </div>
                <CardsContainer />
            </div>
        </AppContext.Provider>
    );
}

export default App;
