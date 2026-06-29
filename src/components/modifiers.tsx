import DataSelector from "./filters/dataselect";
import FiltersSection from "./filters/filters";
import TagsSection from "./filters/tags";
import StatsSection from "./stats";
import Header from "./header";
import OptionsPanel from "./options";
import { useContext } from "react";
import ResetFilters from "../../utils/ResetFilters";
import { AppContext } from "../App";

function ModifiersContainer() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("ContextError: Context passed to Header is null");

    return (
        <div
            id="modifiers"
            className="scroll-container flex flex-col gap-2 rounded-2xl md:h-full md:w-2xl md:overflow-y-scroll">
            <Header />
            <OptionsPanel />
            <DataSelector />
            <FiltersSection />
            <TagsSection />
            <StatsSection />
            <button
                className="button inline-flex w-full items-center justify-center gap-1 p-1"
                onClick={() => {
                    ResetFilters(ctx);
                }}>
                <i className="material-symbols-outlined">refresh</i> إعادة ضبط
                إعدادات التصفية
            </button>
        </div>
    );
}

export default ModifiersContainer;
