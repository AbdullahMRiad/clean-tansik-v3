import Decimal from "decimal.js";
import { useContext } from "react";
import { AppContext } from "../../App";

function ScoreSearch({ hidden = false }: { hidden?: boolean }) {
    const { quduratScore, setQuduratScore, schoolScore, setSchoolScore } =
        useContext(AppContext);

    const message = `يتم حساب الدرجة عن طريق هذه المعادلة:

((درجة\xa0المدرسة\xa0÷\xa0٢)\xa0+\xa0(درجة\xa0القدرات\xa0÷\xa0٢))\xa0×\xa0٤,١
`;

    return (
        <div
            id="score-search"
            className={"m-1 flex flex-col p-1" + (hidden ? " hidden" : "")}>
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
                        onChange={(e) =>
                            setQuduratScore(e.target.valueAsNumber || 0)
                        }
                    />
                </div>
            </div>
            <span className="mt-2 w-full text-center">
                الدرجة بعد المعادلة:{" "}
                <span id="calculated-score">
                    {new Decimal(schoolScore)
                        .div(2)
                        .plus(new Decimal(quduratScore).div(2))
                        .times(4.1)
                        .toString()}
                </span>
                <button
                    className="border-b-2 border-dotted border-black"
                    onClick={() => alert(message)}>
                    ℹ️
                </button>
            </span>
        </div>
    );
}

export default ScoreSearch;
