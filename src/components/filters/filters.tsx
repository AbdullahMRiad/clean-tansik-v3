import { useState } from "react";
import NameSearch from "./name";
import ScoreSearch from "./score";
import type { SearchType } from "../../../types/types";

function FiltersSection() {
    const [searchType, setSearchType] = useState("score" as SearchType);
    return (
        <div id="filters-section" className="panel">
            <div id="searchtype-selector" className="flex w-full">
                <label
                    htmlFor="score-search"
                    className="radio-selector xs:!h-16 flex !h-20 !w-1/3 text-center has-checked:!w-2/3">
                    <span className="mx-auto self-center">
                        درجتي المدرسة والقدرات
                    </span>
                    <input
                        type="radio"
                        id="score-search"
                        name="search-type"
                        value="score-search"
                        className="hidden"
                        defaultChecked
                        onChange={() => {
                            setSearchType("score");
                            console.log("score");
                        }}
                    />
                </label>
                <label
                    htmlFor="name-search"
                    className="radio-selector xs:!h-16 flex !h-20 !w-1/3 text-center has-checked:!w-2/3">
                    <span className="mx-auto self-center">
                        اسم الكلية والحد الأدنى
                    </span>
                    <input
                        type="radio"
                        id="name-search"
                        name="search-type"
                        value="name-search"
                        className="hidden"
                        onChange={() => {
                            setSearchType("name");
                            console.log("name");
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
