import { useContext } from "react";
import { AppContext } from "../../App";
import Decimal from "decimal.js";

function NameSearch() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to NameSearch is null");
    const {
        setCollegeName,
        setLimit,
        limit,
        collegeName,
        setSchoolScore,
        setQuduratScore,
    } = ctx;
    return (
        <div id="score-search" className="flex flex-col">
            <div id="inputs-container" className="w-full">
                <div className="m-1">
                    <label htmlFor="minimum-score" className="text-center">
                        <span>الدرجة بعد المعادلة</span>
                    </label>
                    <input
                        dir="ltr"
                        id="minimum-score"
                        placeholder="درجة من 0 إلى 410"
                        type="number"
                        min="0"
                        max="410"
                        step="0.000001"
                        value={limit}
                        className="h-12 w-full"
                        onChange={(e) => {
                            const val = Math.min(
                                Math.max(e.target.valueAsNumber, 0),
                                410,
                            );
                            setLimit(val);
                            if (val >= 205) {
                                setSchoolScore(100);
                                const qud = new Decimal(val)
                                    .dividedBy(4.1)
                                    .sub(50)
                                    .mul(2);
                                setQuduratScore(qud.toDP(6).toNumber());
                            } else {
                                setQuduratScore(0);
                                const sch = new Decimal(val)
                                    .dividedBy(4.1)
                                    .mul(2);
                                setSchoolScore(sch.toDP(6).toNumber());
                            }
                        }}
                    />
                </div>
                <div className="m-1">
                    <label htmlFor="college-name" className="text-center">
                        <span>اسم الكلية</span>
                    </label>
                    <input
                        id="college-name"
                        placeholder="اسم الكلية"
                        type="text"
                        className="h-12 w-full"
                        defaultValue={collegeName}
                        onChange={(e) => {
                            setCollegeName(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NameSearch;
