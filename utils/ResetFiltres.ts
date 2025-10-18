import type { College, Context } from "../types/types";
import _2025b from "../data/json/2025b.json";

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
        setSearchType,
        setSourceData,
        setFilteredData,
        setTaggedData,
    } = context;

    const reset = window.confirm(
        "هل تريد إعادة ضبط جميع إعدادات التصفية إلى ضبطها الأساسي؟",
    );

    if (reset) {
        setGender("boys");
        setYear(2025);
        setTags([]);
        setTypes([]);
        setSchoolScore(100);
        setQuduratScore(100);
        setCollegeName("");
        setLimit(410);
        setSearchType("score");
        setSourceData(_2025b as College[]);
        setFilteredData(_2025b as College[]);
        setTaggedData(_2025b as College[]);
        document.querySelector("html")!.dataset.theme = "boys";
        (document.getElementById("school-score") as HTMLInputElement).value =
            "100";
        (document.getElementById("qudurat-score") as HTMLInputElement).value =
            "100";
        (document.getElementById("college-name") as HTMLInputElement).value =
            "";
        (document.getElementById("minimum-score") as HTMLInputElement).value =
            "410";
    }
}

export default ResetFilters;
