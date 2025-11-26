import type { Context } from "../types/types";

export default function GetAvailableTags(ctx: Context): string[] {
    const tagsSet = new Set<string>();
    ctx.sourceData.forEach((college) => {
        tagsSet.add(college.المجال);
    });

    return Array.from(tagsSet);
}
