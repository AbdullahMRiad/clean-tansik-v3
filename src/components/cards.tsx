import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { TipToggler, Tip } from "./toggletip";

export default function CardsContainer() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to DataSelector is null");
    const data = ctx.finalData;

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        let observer: IntersectionObserver | null = null;

        const setupObserver = () => {
            if (!mediaQuery.matches) {
                observer?.disconnect();
                observer = null;
                setIsScrolled(false);
                return;
            }

            observer = new IntersectionObserver(
                (e) => setIsScrolled(!e[0].isIntersecting),
                {
                    threshold: 0,
                    root: document.getElementById("cards-container"),
                },
            );

            const target = document.getElementsByClassName("card")[1];
            if (target) observer.observe(target);
        };

        setupObserver();
        mediaQuery.addEventListener("change", setupObserver);

        return () => {
            mediaQuery.removeEventListener("change", setupObserver);
            observer?.disconnect();
        };
    }, []);

    return (
        <div
            id="cards-container"
            className={
                data.length === 0
                    ? "scroll-container flex w-full flex-col items-center justify-center rounded-2xl md:h-full"
                    : "scroll-container relative grid w-full grid-cols-1 gap-2 rounded-2xl md:h-full md:overflow-y-scroll lg:grid-cols-2"
            }>
            {data.length > 0 ? (
                <>
                    {data.map((v, i) => (
                        <Card
                            name={v.الكلية}
                            limit={parseFloat(v.الدرجة)}
                            icon={v.الأيقونة}
                            quduratScore={Math.ceil(
                                parseFloat(
                                    (
                                        (2 * parseFloat(v.الدرجة)) / 4.1 -
                                        100
                                    ).toFixed(6),
                                ),
                            )}
                            key={i}
                        />
                    ))}
                    {window.matchMedia("(min-width: 768px)").matches && (
                        <button
                            className={`button material-symbols-outlined fixed bottom-4 left-4 h-12! w-12! p-2! ${isScrolled ? "translate-0 opacity-100" : "translate-y-4 opacity-0"}`}
                            onClick={() =>
                                document
                                    .getElementById("cards-container")
                                    ?.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                    })
                            }>
                            vertical_align_top
                        </button>
                    )}
                </>
            ) : (
                <>
                    <span className="material-symbols-outlined text-[96px]!">
                        error
                    </span>
                    <span className="text-2xl font-bold">لا توجد نتائج</span>
                </>
            )}
            <Tip info="يشير هذا المربع إلى الحد الأدنى لدرجة القدرات بافتراض الدرجة النهائية في المدرسة" />
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
        <div className="card panel max-h-min">
            <span className="flex flex-row">
                <span className="material-symbols-outlined ml-2">{icon}</span>
                <span>{name}</span>
            </span>
            <div
                className="grid w-full grid-cols-2 gap-1" /* scores container */
            >
                <div className="flex flex-col rounded-2xl bg-mist-100 p-1 dark:border-2 dark:border-mist-700 dark:bg-transparent">
                    <span className="text-center">الحد الأدنى</span>
                    <span className="text-center text-2xl font-bold">
                        {limit}
                    </span>
                </div>
                <div className="flex flex-col rounded-2xl bg-mist-100 p-1 dark:border-2 dark:border-mist-700 dark:bg-transparent">
                    <span className="text-center">
                        <TipToggler>درجة القدرات</TipToggler>
                    </span>
                    <span className="text-center text-2xl font-bold">
                        {quduratScore}
                    </span>
                </div>
            </div>
        </div>
    );
}
