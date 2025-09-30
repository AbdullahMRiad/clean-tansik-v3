import { useContext } from "react";
import { AppContext } from "../../App";

function NameSearch({ hidden = false }: { hidden?: boolean }) {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to NameSearch is null");
    const { setCollegeName, setLimit } = ctx;
    return (
        <div
            id="score-search"
            className={"m-1 flex flex-col p-1" + (hidden ? " hidden" : "")}>
            <div id="inputs-container" className="w-full">
                <div className="m-1">
                    <label htmlFor="college-name" className="text-center">
                        <span>اسم الكلية</span>
                    </label>
                    <input
                        id="college-name"
                        placeholder="اسم الكلية"
                        type="text"
                        className="h-12 w-full"
                        onChange={(e) => {
                            console.log(e.target.value);
                            setCollegeName(e.target.value);
                        }}
                    />
                </div>
                <div className="m-1">
                    <label htmlFor="minimum-score" className="text-center">
                        <span>الحد الأدنى</span>
                    </label>
                    <input
                        id="minimum-score"
                        placeholder="درجة من 0 إلى 410"
                        type="number"
                        min="0"
                        max="410"
                        step="0.000001"
                        className="h-12 w-full"
                        onChange={(e) => {
                            console.log(e.target.valueAsNumber);
                            setLimit(e.target.valueAsNumber || 410);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NameSearch;
