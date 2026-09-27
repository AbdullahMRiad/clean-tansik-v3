import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Decimal from "decimal.js";

function ScoreSearch() {
    const {
        quduratScore,
        setQuduratScore,
        schoolScore,
        setSchoolScore,
        setLimit,
        year,
    } = useContext(AppContext);
    const factor = year === 2026 ? 3.2 : 4.1;

    function calculateConvertedScore() {
        const limit = new Decimal(schoolScore)
            .add(quduratScore)
            .dividedBy(2)
            .mul(factor);
        setLimit(limit.toNumber());
    }

    useEffect(() => {calculateConvertedScore()}, [year]);

    return (
        <div className="flex flex-col">
            <div
                id="inputs-container"
                className="grid w-full grid-cols-2 gap-1">
                <div className="flex flex-col justify-center">
                    <label htmlFor="school-score" className="text-center">
                        <span>درجة المدرسة</span>
                    </label>
                    <input
                        dir="ltr"
                        id="school-score"
                        placeholder="درجة من 0 إلى 100"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        className="h-12 w-full"
                        value={schoolScore}
                        onChange={(e) => {
                            const val = Math.min(
                                Math.max(e.target.valueAsNumber, 0),
                                100,
                            );
                            setSchoolScore(val);
                            calculateConvertedScore();
                        }}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <label htmlFor="qudurat-score" className="text-center">
                        <span>درجة القدرات</span>
                    </label>
                    <input
                        dir="ltr"
                        id="qudurat-score"
                        placeholder="درجة من 0 إلى 100"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        className="h-12 w-full"
                        value={quduratScore}
                        onChange={(e) => {
                            const val = Math.min(
                                Math.max(e.target.valueAsNumber, 0),
                                100,
                            );
                            setQuduratScore(val);
                            calculateConvertedScore();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScoreSearch;
