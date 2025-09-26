function FiltersSection() {
    return(
        <div id="filters-section" className="panel">
            <div id="searchtype-selector" className="w-full flex">
                <label htmlFor="score-search"  className="radio-selector !h-16 !w-1/3 has-checked:!w-2/3 text-center flex">
                    <span className="self-center mx-auto">درجتي المدرسة والقدرات</span>
                    <input type="radio" id="score-search" name="search-type" value="score-search" className="hidden" defaultChecked/>
                </label>
                <label htmlFor="name-search" className="radio-selector !h-16 !w-1/3 has-checked:!w-2/3 text-center flex">
                    <span className="self-center mx-auto">اسم الكلية والحد الأدنى</span>
                    <input type="radio" id="name-search" name="search-type" value="name-search" className="hidden"/>
                </label>
            </div>
        </div>
    )
}

export default FiltersSection