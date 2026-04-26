import type { College, Context } from "../types/types";

export default function FilterData(
    data: College[],
    context: Context,
): College[] {
    console.log("Filtering data with context: ", context);
    let filteredData = data;
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
    console.log(
        "Filtering by score with schoolScore: ",
        context.schoolScore,
        " and quduratScore: ",
        context.quduratScore,
    );

    let taggedData = filteredData;
    if (context.tags.length !== 0) {
        taggedData = filteredData.filter((college) => {
            return context.tags.includes(college["المجال"]);
        });
    }

    let typedData = taggedData;

    if (context.types.length !== 0) {
        typedData = taggedData.filter((college) => {
            return context.types.includes(college["النوع"]);
        });
    }

    return typedData;
}
