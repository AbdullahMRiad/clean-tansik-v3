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
import ModifiersContainer from "./components/modifiers";

import _2025b from "../data/json/2025b.json";

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
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        let observer: IntersectionObserver | null = null;

        const setupObserver = () => {
            if (!mediaQuery.matches) {
                observer?.disconnect();
                observer = null;
                setIsScrolled(false);
                return;
            }

            observer = new IntersectionObserver(
                (e) => setIsScrolled(!e[0].isIntersecting),
                { threshold: 0 },
            );

            const target = document.getElementById("filters-section");
            if (target) observer.observe(target);
        };

        setupObserver();
        mediaQuery.addEventListener("change", setupObserver);

        return () => {
            mediaQuery.removeEventListener("change", setupObserver);
            observer?.disconnect();
        };
    }, []);
    const [isSkipped, setIsSkipped] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        let observer: IntersectionObserver | null = null;

        const setupObserver = () => {
            if (!mediaQuery.matches) {
                observer?.disconnect();
                observer = null;
                setIsSkipped(false);
                return;
            }

            observer = new IntersectionObserver(
                (e) =>
                    setIsSkipped(
                        !e[0].isIntersecting && e[0].boundingClientRect.top < 0,
                    ),
                { threshold: 0 },
            );

            const target = document.getElementById("filters-section");
            if (target) observer.observe(target);
        };

        setupObserver();
        mediaQuery.addEventListener("change", setupObserver);

        return () => {
            mediaQuery.removeEventListener("change", setupObserver);
            observer?.disconnect();
        };
    }, []);

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
                isOptionsOpen,
                setIsOptionsOpen,
            }}>
            <div className="flex h-screen w-full flex-col gap-2 p-2 md:flex-row">
                <ModifiersContainer />
                <CardsContainer />
                <button
                    className={`button material-symbols-outlined fixed bottom-2 left-2 aspect-square w-fit! p-2! transition-all ${isScrolled ? "translate-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    onClick={() => {
                        document.scrollingElement?.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}>
                    vertical_align_top
                </button>
                <button
                    className={`button material-symbols-outlined fixed bottom-2 left-1/2 aspect-square w-fit! -translate-x-1/2 p-2! transition-all ${!isSkipped ? "translate-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    onClick={() => {
                        document.scrollingElement?.scrollTo({
                            top: Math.floor(
                                document
                                    .querySelectorAll(".card")[0]
                                    .getBoundingClientRect().top +
                                    window.scrollY,
                            ),
                            left: 0,
                            behavior: "smooth",
                        });
                        setIsSkipped(true);
                    }}>
                    vertical_align_bottom
                </button>
            </div>
        </AppContext.Provider>
    );
}

export default App;
