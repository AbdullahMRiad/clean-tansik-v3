// import type { College, Data, Year } from "../../types/types"
// 
// import * as data  from "../../data/json/sample.json"

export default function CardsContainer() {

    return(
        <div id="cards-container" className="w-full grid grid-cols-1">
            <Card name="اسم كلية طويل جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا" icon="🙋‍♂️" limit={410} quduratScore={100}/>
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
                    <span className="text-3xl font-bold text-center">{limit}</span>
                </div>
                <div className="flex flex-col w-1/2 rounded-2xl bg-white m-1 p-1">
                    <span className="text-center">درجة القدرات <button className="border-dotted border-b-black border-b-2" onClick={()=>alert("يشير هذا المربع إلى الحد الأدنى لدرجة القدرات بافتراض الدرجة النهائية في المدرسة")}>ℹ️</button></span>
                    <span className="text-3xl font-bold text-center">{quduratScore}</span>
                </div>
            </div>
        </div>
    )
}