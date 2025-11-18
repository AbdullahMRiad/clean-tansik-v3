import Decimal from "decimal.js";
import type { College, Context, Stats } from "../types/types";

export default function CalculateStats(
    data: College[],
    context: Context,
): Stats {
    // Calculate total colleges
    const totalColleges = data.length;

    // Calculate available and unavailable colleges
    let availableColleges;
    if (context.searchType === "score") {
        const calculatedScore = new Decimal(context.schoolScore)
            .add(context.quduratScore)
            .dividedBy(2)
            .times(4.1);
        availableColleges = data.filter((v) => {
            return parseFloat(v.الدرجة) <= calculatedScore.toNumber();
        });
    } else {
        availableColleges = data.filter((v) => {
            return parseFloat(v.الدرجة) <= context.limit;
        });
    }

    return {
        totalColleges: totalColleges,
        availableColleges: availableColleges.length,
        unavailableColleges: totalColleges - availableColleges.length,
        filteredColleges: context.finalData.length,
    } as Stats;
}
