import { useContext } from "react";
import { AppContext } from "../App";

function StatsSection() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to StatsSection is null");
    const { sourceData, filteredData, taggedData } = ctx;

    return (
        <div id="stats-section" className="panel grid grid-cols-2 grid-rows-2">
            <Stat name="إجمالي الكليات" value={sourceData.length.toString()} />
            <Stat
                name="الكليات بعد التصفية"
                value={taggedData.length.toString()}
            />
            <Stat
                name="الكليات المتاحة"
                value={filteredData.length.toString()}
                state="success"
            />
            <Stat
                name="الكليات الغير متاحة"
                value={(sourceData.length - filteredData.length).toString()}
                state="fail"
            />
        </div>
    );
}

function Stat({
    name,
    value,
    state = "neutral",
}: {
    name: string;
    value: string;
    state?: "neutral" | "success" | "fail";
}) {
    let style;

    if (state === "fail") {
        style = " !border-red-400 !bg-red-100";
    } else if (state === "success") {
        style = " !border-green-400 !bg-green-100";
    } else {
        style = "";
    }

    return (
        <div className={"panel flex flex-col" + style}>
            <span className="text-center">{name}</span>
            <span className="my-2 self-center justify-self-center text-3xl font-bold">
                {value}
            </span>
        </div>
    );
}

export default StatsSection;
