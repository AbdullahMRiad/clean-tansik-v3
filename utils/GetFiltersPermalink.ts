import type { Context } from "../types/types";

function GetFiltersPermalink(context: Context): string {
    const {
        gender,
        year,
        tags,
        types,
        schoolScore,
        quduratScore,
        collegeName,
        limit,
    } = context;
    const params: string[] = [];
    const url = new URL(window.location.href);

    if (gender) params.push(`gender=${gender}`);
    if (year) params.push(`year=${year}`);
    if (collegeName) params.push(`college=${collegeName}`);
    if (schoolScore && quduratScore) {
        params.push(`school=${schoolScore}`);
        params.push(`qudurat=${quduratScore}`);
    } else if (limit) {
        params.push(`limit=${limit}`);
    }
    if (tags.length > 0) params.push(`tags=${tags.join(",")}`);
    if (types.length > 0) params.push(`types=${types.join(",")}`);

    if (params.length > 0) {
        url.search = `?${params.join("&")}`;
    }
    return url.toString();
}

export default GetFiltersPermalink;
