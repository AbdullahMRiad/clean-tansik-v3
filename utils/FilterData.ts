import Decimal from "decimal.js";
import type { College, Context } from "../types/types";

export default function FilterData(
    data: College[],
    context: Context,
): College[] {
    console.log("Filtering data with context: ", context);
    let filteredData = data;
    if (context.searchType === "name") {
        console.log(
            "Filtering by name with collegeName: ",
            context.collegeName,
            " and limit: ",
            context.limit,
        );
        filteredData = data.filter((college) => {
            return (
                college["الكلية"].includes(context.collegeName) &&
                parseFloat(college["الدرجة"]) <= context.limit
            );
        });
    } else if (context.searchType === "score") {
        console.log(
            "Filtering by score with schoolScore: ",
            context.schoolScore,
            " and quduratScore: ",
            context.quduratScore,
        );
        filteredData = data.filter((college) => {
            const calculatedScore = new Decimal(context.schoolScore)
                .add(context.quduratScore)
                .dividedBy(2)
                .times(4.1);
            return parseFloat(college["الدرجة"]) <= calculatedScore.toNumber();
        });
    } else {
        console.log("No valid search type found, returning empty data.");
        filteredData = [];
    }

    let taggedData = filteredData.filter((college) => {
        return context.tags.includes(college["المجال"]);
    });

    if (context.tags.length === 0) {
        taggedData = filteredData;
    }

    let typedData = taggedData.filter((college) => {
        return context.types.includes(college["النوع"]);
    });

    if (context.types.length === 0) {
        typedData = taggedData;
    }

    return typedData;
}
