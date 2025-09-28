import { useState } from "react"
import { setGender, setYear, year } from "../../datamanager"

function DataSelector() {
    const [yearLabel, setYearLabel] = useState(year)

    return(
        <div id="dataselector-container" className="panel">
            <div id="gender-selector" className="w-full flex">
                <label htmlFor="boys"  className="radio-selector flex">
                    <span className="self-center mx-auto">بنين</span>
                    <input type="radio" id="boys" name="gender" value="boys" className="hidden" defaultChecked onClick={()=>{setGender("boys")}}/>
                </label>
                <label htmlFor="girls" className="radio-selector flex">
                    <span className="self-center mx-auto">بنات</span>
                    <input type="radio" id="girls" name="gender" value="girls" className="hidden" onClick={()=>{setGender("girls")}}/>
                </label>
            </div>
            <div id="year-selector" className="flex justify-center">
                <button
                    className="button h-12 w-12"
                    onClick={() => {
                        if (year < 2025) {
                            setYear(year + 1);
                            setYearLabel(year)
                        }
                    }}
                >+
                </button>
                <span className="h-min self-center mx-8 text-lg">{yearLabel}</span>
                <button
                    className="button h-12 w-12"
                    onClick={() => {
                        if (year > 2019) {
                            setYear(year - 1);
                            setYearLabel(year)
                        }
                    }}
                >-</button>
            </div>
        </div>
    )
}

export default DataSelector