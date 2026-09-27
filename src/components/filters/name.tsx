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
        year
    } = ctx;
    const factor = year === 2026 ? 3.2 : 4.1
    return (
        <div className="flex flex-col">
            <div
                id="inputs-container"
                className="grid w-full grid-cols-1 gap-1">
                <div>
                    <label htmlFor="minimum-score" className="text-center">
                        <span>الدرجة بعد المعادلة</span>
                    </label>
                    <input
                        dir="ltr"
                        id="minimum-score"
                        placeholder={"درجة من 0 إلى " + (year === 2026 ? "320" : "410")}
                        type="number"
                        min="0"
                        max={year === 2026 ? "320" : "410"}
                        step="0.000001"
                        value={limit}
                        className="h-12 w-full"
                        onChange={(e) => {
                            const val = Math.min(
                                Math.max(e.target.valueAsNumber, 0),
                                year === 2026 ? 320 : 410,
                            );
                            setLimit(val);
                            if (val >= (year === 2026 ? 160 : 205)) {
                                setSchoolScore(100);
                                const qud = new Decimal(val)
                                    .dividedBy(factor)
                                    .sub(50)
                                    .mul(2);
                                setQuduratScore(qud.toDP(6).toNumber());
                            } else {
                                setQuduratScore(0);
                                const sch = new Decimal(val)
                                    .dividedBy(factor)
                                    .mul(2);
                                setSchoolScore(sch.toDP(6).toNumber());
                            }
                        }}
                    />
                </div>
                <div>
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
