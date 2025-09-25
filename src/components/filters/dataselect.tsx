function DataSelector() {
    return(
        <div id="dataselector-container" className="panel">
            <div id="gender-selector">
                <input type="radio" id="boys" name="gender" value="boys" className="hidden"/>
                <label htmlFor="boys">بنين</label>
            </div>
            <div id="year-selector"></div>
        </div>
    )
}

export default DataSelector