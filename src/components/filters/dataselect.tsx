import { useEffect, useMemo } from "react"
import type { Gender, YearSelection } from "../../../types/types"

type Props = {
    value: YearSelection
    onChange: (value: YearSelection) => void
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

function DataSelector({ value, onChange }: Props) {
    const fileSuffix = useMemo(() => (value.gender === "boys" ? "b" : "g"), [value.gender])
    useEffect(() => {
        // Ensure selected year exists
        if (!YEARS.includes(value.year)) {
            onChange({ ...value, year: 2025 })
        }
    }, [value, onChange])

    function setGender(next: Gender) {
        if (next !== value.gender) onChange({ ...value, gender: next })
    }

    function setYear(next: number) {
        if (next !== value.year) onChange({ ...value, year: next })
    }

    return(
        <div id="dataselector-container" className="panel flex flex-wrap items-center gap-3">
            <div id="gender-selector" className="flex gap-2">
                <button
                    className={`px-3 py-1 rounded-full ${value.gender === "boys" ? "bg-amber-300" : "bg-amber-100"}`}
                    onClick={() => setGender("boys")}
                >
                    بنين
                </button>
                <button
                    className={`px-3 py-1 rounded-full ${value.gender === "girls" ? "bg-amber-300" : "bg-amber-100"}`}
                    onClick={() => setGender("girls")}
                >
                    بنات
                </button>
            </div>
            <div id="year-selector" className="flex gap-2 overflow-x-auto">
                {YEARS.map(y => (
                    <button
                        key={y}
                        className={`px-3 py-1 rounded-full ${value.year === y ? "bg-amber-300" : "bg-amber-100"}`}
                        onClick={() => setYear(y)}
                        title={`${y}${fileSuffix}`}
                    >
                        {y}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DataSelector