import type { ReactNode } from "react";

export function TipToggler({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <button popoverTarget="info-tip" className="decoration decoration-dotted underline underline-offset-4 cursor-help">
            {children}
        </button>
    );
}

export function Tip(
    {info}: {info: string}
) {
    return(
        <span
                popover="auto"
                id={`info-tip`}
                className="
                    inset-auto top-[anchor(bottom)] left-[anchor(right)]
                    m-1 mr-4 py-2 px-3 max-w-[35ch]
                    origin-top-left
                    bg-blue-50 girls:bg-red-50 dark:bg-slate-800 dark:girls:bg-stone-900
                    rounded-xl rounded-tl-sm
                    border border-slate-200 girls:border-stone-200 dark:border-slate-700 dark:girls:border-stone-700
                    text-slate-800 dark:text-slate-100 tabular-nums
                    shadow-lg
                    cursor-auto
                    transition-[scale,opacity,display,overlay] transition-discrete duration-200
                    scale-90 opacity-0
                    open:scale-100 open:opacity-100
                    starting:open:scale-90 starting:open:opacity-0
                ">
                    {info}
                </span>
    )
}