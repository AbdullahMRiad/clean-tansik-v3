import type { ReactNode } from "react";

export function TipToggler({ children }: { children: ReactNode }) {
    return (
        <button
            popoverTarget="info-tip"
            className="decoration cursor-help underline decoration-dotted underline-offset-4">
            {children}
        </button>
    );
}

export function Tip({ info }: { info: string }) {
    return (
        <span
            popover="auto"
            id={`info-tip`}
            className="inset-auto top-[anchor(bottom)] left-[anchor(right)] m-1 mr-4 max-w-[35ch] origin-top-left scale-90 cursor-auto rounded-xl rounded-tl-sm border border-mist-200 bg-mist-50 px-3 py-2 text-mist-800 tabular-nums opacity-0 shadow-lg transition-[scale,opacity,display,overlay] transition-discrete duration-200 open:scale-100 open:opacity-100 dark:border-mist-700 dark:bg-mist-800 dark:text-mist-100 starting:open:scale-90 starting:open:opacity-0">
            {info}
        </span>
    );
}
