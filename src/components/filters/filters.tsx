import { useContext } from "react";
import { AppContext } from "../../App";
import NameSearch from "./name";
import ScoreSearch from "./score";

function FiltersSection() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error(
            "ContextError: Context passed to FiltersSection is null",
        );

    return (
        <div id="filters-section" className="panel m-1 p-1">
            <ScoreSearch />
            <NameSearch />
        </div>
    );
}

export default FiltersSection;
