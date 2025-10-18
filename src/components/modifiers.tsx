import DataSelector from "./filters/dataselect";
import FiltersSection from "./filters/filters";
import TagsSection from "./filters/tags";
import StatsSection from "./stats";
import Header from "./header";
import OptionsPanel from "./options";

function ModifiersContainer() {
    return (
        <div
            id="modifiers"
            className="scroll-container flex flex-col gap-2 rounded-2xl md:h-full md:max-w-sm md:overflow-y-scroll">
            <Header />
            <OptionsPanel />
            <DataSelector />
            <FiltersSection />
            <TagsSection />
            <StatsSection />
        </div>
    );
}

export default ModifiersContainer;
