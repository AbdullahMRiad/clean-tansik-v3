function DataSelector() {
    return(
        <div id="dataselector-container" className="panel">
            <div id="gender-selector" className="w-full flex">
                <label htmlFor="boys"  className="w-2/5 bg-red-400 m-1 p-1 rounded-2xl text-center has-checked:w-3/5 has-checked:bg-green-400 transition-all">
                    <span>بنين</span>
                    <input type="radio" id="boys" name="gender" value="boys" className="hidden" defaultChecked/>
                </label>
                <label htmlFor="girls" className="w-2/5 bg-red-400 m-1 p-1 rounded-2xl text-center has-checked:w-3/5 has-checked:bg-green-400 transition-all">
                    <span>بنات</span>
                    <input type="radio" id="girls" name="gender" value="girls" className="hidden"/>
                </label>
            </div>
            <div id="year-selector"></div>
        </div>
    )
}

export default DataSelector