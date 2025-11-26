import type { Context } from "../types/types";

export default function GetAvailableTags(ctx: Context): string[] {
    const typesSet = new Set<string>();
    ctx.sourceData.forEach((college) => {
        typesSet.add(college.النوع);
    });

    return Array.from(typesSet);
}
