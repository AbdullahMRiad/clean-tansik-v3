function StatsSection() {
    return(
        <div id="stats-section" className="panel grid grid-cols-2 grid-rows-2">
            <Stat name="إجمالي الكليات" value="240"/>
            <Stat name="الكليات بعد التصفية" value="240"/>
            <Stat name="الكليات المتاحة" value="240" state="success"/>
            <Stat name="الكليات الغير متاحة" value="0" state="fail"/>
        </div>
    )
}

function Stat({name, value, state="neutral"}:{name:string, value:string, state?:"neutral"|"success"|"fail"}) {
    let style

    if (state === "fail") {
        style = " !border-red-400 !bg-red-100"
    } else if (state === "success") {
        style = " !border-green-400 !bg-green-100"
    } else {
        style = ""
    }

    return(
        <div className={"panel flex flex-col" + style}>
            <span className="text-center">{name}</span>
            <span className="self-center justify-self-center text-3xl font-bold my-2">{value}</span>
        </div>
    )
}

export default StatsSection