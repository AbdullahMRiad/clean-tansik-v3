import type { College, Context, Stats } from "../types/types";

export default function CalculateStats(
    data: College[],
    context: Context,
): Stats {
    // Calculate total colleges
    const totalColleges = data.length;

    // Calculate available colleges
    let availableColleges;

    availableColleges = data.filter((v) => {
        return parseFloat(v.الدرجة) <= context.limit;
    });

    return {
        totalColleges: totalColleges,
        availableColleges: availableColleges.length,
        unavailableColleges: totalColleges - availableColleges.length,
        filteredColleges: context.finalData.length,
    } as Stats;
}
