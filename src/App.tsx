import { createContext, useEffect, useState } from "react";

import type { College, Context, Gender, Stats, Year } from "../types/types";

import CardsContainer from "./components/cards";
import ModifiersContainer from "./components/modifiers";

import _2025b from "../data/json/2025b.json";

import FilterData from "../utils/FilterData";
import CalculateStats from "../utils/CalculateStats";
import GetAvailableTags from "../utils/GetAvailableTags";
import GetAvailableTypes from "../utils/GetAvailableTypes";

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
    const [finalData, setFinalData] = useState<College[]>(_2025b as College[]);
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
    const [tags, setTags] = useState<string[]>(
        params.get("tags")?.split(",") || [],
    );
    const [types, setTypes] = useState<string[]>(
        params.get("types")?.split(",") || [],
    );
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) return saved === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [stats, setStats] = useState<Stats>({
        totalColleges: 0,
        filteredColleges: 0,
        availableColleges: 0,
        unavailableColleges: 0,
    });

    const ctx = {
        gender,
        setGender,
        year,
        setYear,
        sourceData,
        setSourceData,
        finalData,
        setFinalData,
        schoolScore,
        setSchoolScore,
        quduratScore,
        setQuduratScore,
        collegeName,
        setCollegeName,
        limit,
        setLimit,
        tags,
        setTags,
        types,
        setTypes,
        availableTags,
        setAvailableTags,
        availableTypes,
        setAvailableTypes,
        darkMode,
        setDarkMode,
        isOptionsOpen,
        setIsOptionsOpen,
        stats,
        setStats,
    };

    useEffect(() => {
        setAvailableTags(GetAvailableTags(ctx));
        setAvailableTypes(GetAvailableTypes(ctx));
    }, [sourceData]);

    useEffect(() => {
        setFinalData(FilterData(sourceData, ctx));
    }, [
        schoolScore,
        quduratScore,
        collegeName,
        limit,
        tags,
        types,
        sourceData,
    ]);

    useEffect(() => {
        setStats(CalculateStats(sourceData, ctx));
    }, [finalData]);

    useEffect(() => {
        document.documentElement.dataset.themeMode = darkMode
            ? "dark"
            : "light";
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    return (
        <AppContext.Provider value={ctx}>
            <div className="flex h-screen w-full flex-col gap-2 p-2 md:flex-row">
                <ModifiersContainer />
                <CardsContainer />
                <button
                    className="button material-symbols-outlined fixed bottom-2 left-2 block! p-3! md:hidden!"
                    onClick={() => {
                        document.scrollingElement?.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}>
                    vertical_align_top
                </button>
            </div>
        </AppContext.Provider>
    );
}

export default App;
