import { useState } from "react"
import NameSearch from "./name"
import ScoreSearch from "./score"
import type { SearchType } from '../../../types/types'


function FiltersSection() {
    const [searchType, setSearchType] = useState("score" as SearchType)
    return(
        <div id="filters-section" className="panel">
            <div id="searchtype-selector" className="w-full flex">
                <label htmlFor="score-search"  className="radio-selector !h-20 xs:!h-16 !w-1/3 has-checked:!w-2/3 text-center flex">
                    <span className="self-center mx-auto">درجتي المدرسة والقدرات</span>
                    <input type="radio" id="score-search" name="search-type" value="score-search" className="hidden" defaultChecked onChange={()=>{setSearchType("score");console.log("score")}}/>
                </label>
                <label htmlFor="name-search" className="radio-selector !h-20 xs:!h-16 !w-1/3 has-checked:!w-2/3 text-center flex">
                    <span className="self-center mx-auto">اسم الكلية والحد الأدنى</span>
                    <input type="radio" id="name-search" name="search-type" value="name-search" className="hidden" onChange={()=>{setSearchType("name");console.log("name")}}/>
                </label>
            </div>
            <ScoreSearch hidden={searchType==="name"}/>
            <NameSearch  hidden={searchType==="score"}/>
        </div>
    )
}

export default FiltersSection