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
            className="grid w-full grid-cols-1 md:h-screen md:overflow-y-scroll lg:grid-cols-2">
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
                <div className="m-1 flex w-1/2 flex-col rounded-2xl bg-white p-1">
                    <span className="text-center">الحد الأدنى</span>
                    <span className="text-center text-2xl font-bold">
                        {limit}
                    </span>
                </div>
                <div className="m-1 flex w-1/2 flex-col rounded-2xl bg-white p-1">
                    <span className="text-center">
                        درجة القدرات{" "}
                        <button
                            className="border-b-2 border-dotted border-b-black"
                            onClick={() =>
                                alert(
                                    "يشير هذا المربع إلى الحد الأدنى لدرجة القدرات بافتراض الدرجة النهائية في المدرسة",
                                )
                            }>
                            ℹ️
                        </button>
                    </span>
                    <span className="text-center text-2xl font-bold">
                        {quduratScore}
                    </span>
                </div>
            </div>
        </div>
    );
}
