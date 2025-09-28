import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import type { College, Year } from "../../../types/types";

import _2019b from "../../../data/json/2019b.json";
import _2020b from "../../../data/json/2020b.json";
import _2021b from "../../../data/json/2021b.json";
import _2022b from "../../../data/json/2022b.json";
import _2023b from "../../../data/json/2023b.json";
import _2024b from "../../../data/json/2024b.json";
import _2025b from "../../../data/json/2025b.json";

import _2019g from "../../../data/json/2019g.json";
import _2020g from "../../../data/json/2020g.json";
import _2021g from "../../../data/json/2021g.json";
import _2022g from "../../../data/json/2022g.json";
import _2023g from "../../../data/json/2023g.json";
import _2024g from "../../../data/json/2024g.json";
import _2025g from "../../../data/json/2025g.json";

function DataSelector() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to DataSelector is null");
    const { year, setYear, gender, setGender, setData } = ctx;

    useEffect(() => {
        if (gender === "boys") {
            switch (year) {
                case 2019:
                    setData(_2019b as College[]);
                    break;
                case 2020:
                    setData(_2020b as College[]);
                    break;
                case 2021:
                    setData(_2021b as College[]);
                    break;
                case 2022:
                    setData(_2022b as College[]);
                    break;
                case 2023:
                    setData(_2023b as College[]);
                    break;
                case 2024:
                    setData(_2024b as College[]);
                    break;
                case 2025:
                    setData(_2025b as College[]);
                    break;
                default:
                    setData([]);
                    break;
            }
        } else if (gender === "girls") {
            switch (year) {
                case 2019:
                    setData(_2019g as College[]);
                    break;
                case 2020:
                    setData(_2020g as College[]);
                    break;
                case 2021:
                    setData(_2021g as College[]);
                    break;
                case 2022:
                    setData(_2022g as College[]);
                    break;
                case 2023:
                    setData(_2023g as College[]);
                    break;
                case 2024:
                    setData(_2024g as College[]);
                    break;
                case 2025:
                    setData(_2025g as College[]);
                    break;
                default:
                    setData([]);
                    break;
            }
        }
    }, [year, gender, setData]);

    return (
        <div id="dataselector-container" className="panel">
            <div id="gender-selector" className="flex w-full">
                <label htmlFor="boys" className="radio-selector flex">
                    <span className="mx-auto self-center">بنين</span>
                    <input
                        type="radio"
                        id="boys"
                        name="gender"
                        value="boys"
                        className="hidden"
                        defaultChecked
                        onClick={() => {
                            setGender("boys");
                        }}
                    />
                </label>
                <label htmlFor="girls" className="radio-selector flex">
                    <span className="mx-auto self-center">بنات</span>
                    <input
                        type="radio"
                        id="girls"
                        name="gender"
                        value="girls"
                        className="hidden"
                        onClick={() => {
                            setGender("girls");
                        }}
                    />
                </label>
            </div>
            <div id="year-selector" className="flex justify-center">
                <button
                    className="button h-12 w-12"
                    onClick={() => {
                        if (year < 2025) {
                            setYear((year + 1) as Year);
                        }
                    }}>
                    +
                </button>
                <span className="mx-8 h-min self-center text-lg">{year}</span>
                <button
                    className="button h-12 w-12"
                    onClick={() => {
                        if (year > 2019) {
                            setYear((year - 1) as Year);
                        }
                    }}>
                    -
                </button>
            </div>
        </div>
    );
}

export default DataSelector;
