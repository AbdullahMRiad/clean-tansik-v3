import data from "../../data/json/2025b.json"

export default function CardsContainer() {

    return(
        <div id="cards-container" className="w-full grid grid-cols-1">
            {data.map(
                (v, i) => (
                    <Card
                        name={v.الكلية}
                        limit={parseFloat(v.الدرجة)}
                        icon={v.المجال}
                        quduratScore={
                            Math.ceil(parseFloat((((2 * parseFloat(v.الدرجة)) / 4.1) - 100).toFixed(6)))
                        }
                        key={i}
                    />
                )
            )}
        </div>
    )
}

function Card({
        name,
        limit,
        quduratScore,
        icon
    }: {
        name: string,
        limit: number,
        quduratScore: number,
        icon: string
    }) {
    return(
        <div className="card panel">
            <span><i className="[font-style:normal]">{icon}</i>{name}</span>
            <div className="flex flex-row w-full" /* scores container */>
                <div className="flex flex-col w-1/2 rounded-2xl bg-white m-1 p-1">
                    <span className="text-center">الحد الأدنى</span>
                    <span className="text-2xl font-bold text-center">{limit}</span>
                </div>
                <div className="flex flex-col w-1/2 rounded-2xl bg-white m-1 p-1">
                    <span className="text-center">درجة القدرات <button className="border-dotted border-b-black border-b-2" onClick={()=>alert("يشير هذا المربع إلى الحد الأدنى لدرجة القدرات بافتراض الدرجة النهائية في المدرسة")}>ℹ️</button></span>
                    <span className="text-2xl font-bold text-center">{quduratScore}</span>
                </div>
            </div>
        </div>
    )
}