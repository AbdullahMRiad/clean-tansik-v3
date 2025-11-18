import { useContext } from "react";
import { AppContext } from "../App";

function StatsSection() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to StatsSection is null");
    const { stats } = ctx;

    return (
        <div id="stats-section" className="panel grid grid-cols-2 grid-rows-2">
            <Stat
                name="إجمالي الكليات"
                value={stats.totalColleges.toString()}
            />
            <Stat
                name="الكليات بعد التصفية"
                value={stats.filteredColleges.toString()}
            />
            <Stat
                name="الكليات المتاحة"
                value={stats.availableColleges.toString()}
                state="success"
            />
            <Stat
                name="الكليات الغير متاحة"
                value={stats.unavailableColleges.toString()}
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
        style =
            " border-red-400! dark:border-red-900! bg-red-100! dark:bg-red-950!";
    } else if (state === "success") {
        style =
            " border-green-400! dark:border-green-900! bg-green-100! dark:bg-green-950!";
    } else {
        style = "";
    }

    return (
        <div
            className={
                "girls:bg-red-100 girls:dark:border-stone-700 girls:dark:bg-transparent m-1 flex flex-col rounded-2xl bg-blue-100 p-1 dark:border-2 dark:border-slate-700 dark:bg-transparent" +
                style
            }>
            <span className="text-center">{name}</span>
            <span className="my-2 self-center justify-self-center text-3xl font-bold">
                {value}
            </span>
        </div>
    );
}

export default StatsSection;
