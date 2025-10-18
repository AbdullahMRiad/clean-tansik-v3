import { useContext } from "react";
import { AppContext } from "../App";

export default function CardsContainer() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to DataSelector is null");
    const data = ctx.taggedData;
    return (
        <div
            id="cards-container"
            className="scroll-container grid w-full grid-cols-1 gap-2 rounded-2xl md:h-full md:overflow-y-scroll lg:grid-cols-2">
            {data.map((v, i) => (
                <Card
                    name={v.الكلية}
                    limit={parseFloat(v.الدرجة)}
                    icon={v.الأيقونة}
                    quduratScore={Math.ceil(
                        parseFloat(
                            ((2 * parseFloat(v.الدرجة)) / 4.1 - 100).toFixed(6),
                        ),
                    )}
                    key={i}
                />
            ))}
        </div>
    );
}

function Card({
    name,
    limit,
    quduratScore,
    icon,
}: {
    name: string;
    limit: number;
    quduratScore: number;
    icon: string;
}) {
    return (
        <div className="card panel">
            <span className="flex flex-row">
                <span className="material-symbols-outlined ml-2">{icon}</span>
                <span>{name}</span>
            </span>
            <div className="flex w-full flex-row" /* scores container */>
                <div className="girls:dark:border-stone-700 girls:bg-red-100 girls:dark:bg-transparent m-1 flex w-1/2 flex-col rounded-2xl bg-blue-100 p-1 dark:border-2 dark:border-slate-700 dark:bg-transparent">
                    <span className="text-center">الحد الأدنى</span>
                    <span className="text-center text-2xl font-bold">
                        {limit}
                    </span>
                </div>
                <div className="girls:dark:border-stone-700 girls:bg-red-100 girls:dark:bg-transparent m-1 flex w-1/2 flex-col rounded-2xl bg-blue-100 p-1 dark:border-2 dark:border-slate-700 dark:bg-transparent">
                    <span className="inline-flex justify-center text-center align-middle">
                        <span>درجة القدرات</span>
                        <span
                            className="material-symbols-outlined mr-1 cursor-pointer border-b-2 border-dotted border-b-black text-[18px]! text-black dark:border-b-white dark:text-white"
                            onClick={() =>
                                alert(
                                    "يشير هذا المربع إلى الحد الأدنى لدرجة القدرات بافتراض الدرجة النهائية في المدرسة",
                                )
                            }>
                            info
                        </span>
                    </span>
                    <span className="text-center text-2xl font-bold">
                        {quduratScore}
                    </span>
                </div>
            </div>
        </div>
    );
}
