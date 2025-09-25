function DataSelector() {
    return(
        <div id="dataselector-container" className="panel">
            <div id="gender-selector" className="w-full flex">
                <label htmlFor="boys"  className="radio-selector">
                    <span className="self-center">بنين</span>
                    <input type="radio" id="boys" name="gender" value="boys" className="hidden" defaultChecked/>
                </label>
                <label htmlFor="girls" className="radio-selector">
                    <span className="self-center">بنات</span>
                    <input type="radio" id="girls" name="gender" value="girls" className="hidden"/>
                </label>
            </div>
            <div id="year-selector" className="flex justify-center">
                <button className="button h-12 w-12">+</button>
                <span className="h-min self-center mx-8 text-lg">2025</span>
                <button className="button h-12 w-12">-</button>
            </div>
        </div>
    )
}

export default DataSelector