function NameSearch({hidden = false}:{hidden?:boolean}) {
    return(
        <div id="score-search" className={"m-1 p-1 flex flex-col" + (hidden?" hidden":"")}>
            <div id="inputs-container" className="w-full">
                <div className="m-1">
                    <label htmlFor="college-name" className="text-center">
                        <span>اسم الكلية</span>
                    </label>
                    <input id="college-name" placeholder="اسم الكلية" type="text" className="w-full h-12"/>
                </div>
                <div className="m-1">
                    <label htmlFor="minimum-score" className="text-center">
                        <span>الحد الأدنى</span>
                    </label>
                    <input id="minimum-score" placeholder="درجة من 0 إلى 410" type="number" min="0" max="410" step="0.000001" className="w-full h-12"/>
                </div>
            </div>
        </div>
    )
}

export default NameSearch