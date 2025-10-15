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
    const { searchType, setSearchType } = ctx;
    return (
        <div id="filters-section" className="panel">
            <div id="searchtype-selector" className="flex w-full">
                <label
                    htmlFor="score-search"
                    className="radio-selector button xs:!h-16 flex !h-20 !w-1/3 text-center has-checked:!w-2/3">
                    <span className="mx-auto self-center">
                        درجتي المدرسة والقدرات
                    </span>
                    <input
                        type="radio"
                        id="score-search"
                        name="search-type"
                        value="score-search"
                        className="hidden"
                        checked={searchType === "score"}
                        onChange={() => {
                            setSearchType("score");
                        }}
                    />
                </label>
                <label
                    htmlFor="name-search"
                    className="radio-selector button xs:!h-16 flex !h-20 !w-1/3 text-center has-checked:!w-2/3">
                    <span className="mx-auto self-center">
                        اسم الكلية والحد الأدنى
                    </span>
                    <input
                        type="radio"
                        id="name-search"
                        name="search-type"
                        value="name-search"
                        className="hidden"
                        checked={searchType === "name"}
                        onChange={() => {
                            setSearchType("name");
                        }}
                    />
                </label>
            </div>
            <ScoreSearch hidden={searchType === "name"} />
            <NameSearch hidden={searchType === "score"} />
        </div>
    );
}

export default FiltersSection;
