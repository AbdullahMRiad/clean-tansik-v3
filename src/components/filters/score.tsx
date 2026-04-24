import { useContext } from "react";
import { AppContext } from "../../App";

function ScoreSearch() {
    const { quduratScore, setQuduratScore, schoolScore, setSchoolScore } =
        useContext(AppContext);

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
                        defaultValue={schoolScore}
                        onChange={(e) =>
                            setSchoolScore(e.target.valueAsNumber || 0)
                        }
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
                        defaultValue={quduratScore}
                        onChange={(e) =>
                            setQuduratScore(e.target.valueAsNumber || 0)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ScoreSearch;
