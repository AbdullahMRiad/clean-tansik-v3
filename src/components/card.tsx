import type { College } from "../../types/types"

type Props = {
    college: College
}

function Card({ college }: Props) {
    return (
        <div className="panel flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{college.name}</h3>
                <span className="text-sm text-neutral-700">{college.score}</span>
            </div>
            <div className="flex gap-2 text-sm">
                <span className="rounded-full px-2 py-0.5 bg-amber-200">{college.major}</span>
                <span className="rounded-full px-2 py-0.5 bg-amber-200">{college.kind}</span>
            </div>
        </div>
    )
}

export default Card
