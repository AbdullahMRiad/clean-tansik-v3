import Decimal from "decimal.js";
import type { College, Context } from "../types/types";

function FilterData(data: College[], context: Context): College[] {
    let filteredData = data;
    if (context.searchType === "name") {
        filteredData = data.filter((college) => {
            return (
                college["الكلية"].includes(context.collegeName) &&
                parseFloat(college["الدرجة"]) <= context.limit
            );
        });
    } else if (context.searchType === "score") {
        filteredData = data.filter((college) => {
            const calculatedScore = new Decimal(context.schoolScore)
                .add(context.quduratScore)
                .dividedBy(2)
                .times(4.1);
            return parseFloat(college["الدرجة"]) <= calculatedScore.toNumber();
        });
    } else {
        filteredData = [];
    }

    let taggedData = filteredData.filter((college) => {
        return context.tags.includes(college["المجال"]);
    });

    let typedData = taggedData.filter((college) => {
        return context.types.includes(college["النوع"]);
    });

    return typedData;
}
