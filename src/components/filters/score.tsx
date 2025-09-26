function ScoreSearch() {

    const message = `يتم حساب الدرجة عن طريق هذه المعادلة:

((درجة\xa0المدرسة\xa0÷\xa0٢)\xa0+\xa0(درجة\xa0القدرات\xa0÷\xa0٢))\xa0×\xa0٤,١
`

    return(
        <div id="score-search" className="m-1 p-1 flex flex-col">
            <div id="inputs-container" className="flex flex-row w-full">
                <div className="flex flex-col m-1 w-1/2 justify-center">
                    <label htmlFor="school-score" className="text-center">
                        <span>درجة المدرسة</span>
                    </label>
                    <input id="school-score" placeholder="درجة من 0 إلى 100" type="number" min="0" max="100" step="0.01" className="w-full h-12"/>
                </div>
                <div className="flex flex-col m-1 w-1/2 justify-center">
                    <label htmlFor="qudurat-score" className="text-center">
                        <span>درجة القدرات</span>
                    </label>
                    <input id="qudurat-score" placeholder="درجة من 0 إلى 100" type="number" min="0" max="100" step="1" className="w-full h-12"/>
                </div>
            </div>
            <span className="w-full text-center mt-2">الدرجة بعد المعادلة: <span id="calculated-score">407.95</span><button className="border-dotted border-b-2 border-black" onClick={() => alert(message)}>ℹ️</button></span>
        </div>
    )
}

export default ScoreSearch