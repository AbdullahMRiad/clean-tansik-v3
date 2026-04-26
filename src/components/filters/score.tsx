import { useContext } from "react";
import { AppContext } from "../../App";
import Decimal from "decimal.js";

function ScoreSearch() {
    const {
        quduratScore,
        setQuduratScore,
        schoolScore,
        setSchoolScore,
        setLimit,
    } = useContext(AppContext);

    return (
        <div id="score-search" className="flex flex-col">
            <div id="inputs-container" className="flex w-full flex-row">
                <div className="m-1 flex w-1/2 flex-col justify-center">
                    <label htmlFor="school-score" className="text-center">
                        <span>درجة المدرسة</span>
                    </label>
                    <input
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
                            const limit = new Decimal(val)
                                .add(quduratScore)
                                .dividedBy(2)
                                .mul(4.1);
                            setLimit(limit.toNumber());
                        }}
                    />
                </div>
                <div className="m-1 flex w-1/2 flex-col justify-center">
                    <label htmlFor="qudurat-score" className="text-center">
                        <span>درجة القدرات</span>
                    </label>
                    <input
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
                            const limit = new Decimal(val)
                                .add(schoolScore)
                                .dividedBy(2)
                                .mul(4.1);
                            setLimit(limit.toNumber());
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScoreSearch;
