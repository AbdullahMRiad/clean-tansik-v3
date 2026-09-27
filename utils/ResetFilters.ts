import type { College, Context } from "../types/types";
import _2026b from "../data/json/2026b.json";

function ResetFilters(context: Context) {
    const {
        setGender,
        setYear,
        setTags,
        setTypes,
        setSchoolScore,
        setQuduratScore,
        setCollegeName,
        setLimit,
        setSourceData,
        year
    } = context;

    const reset = window.confirm(
        "هل تريد إعادة ضبط جميع إعدادات التصفية إلى ضبطها الأساسي؟",
    );

    if (reset) {
        setGender("boys");
        setYear(2026);
        setTags([]);
        setTypes([]);
        setSchoolScore(100);
        setQuduratScore(100);
        setCollegeName("");
        setLimit(year === 2026 ? 320 : 410);
        setSourceData(_2026b as College[]);
        document.querySelector("html")!.dataset.theme = "boys";
        (document.getElementById("school-score") as HTMLInputElement).value =
            "100";
        (document.getElementById("qudurat-score") as HTMLInputElement).value =
            "100";
        (document.getElementById("college-name") as HTMLInputElement).value =
            "";
        (document.getElementById("minimum-score") as HTMLInputElement).value =
            year === 2026 ? "320" : "410";
    }
}

export default ResetFilters;
