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
        searchType,
    } = context;
    const params: string[] = [];
    if (gender) params.push(`gender=${gender}`);
    if (year) params.push(`year=${year}`);
    if (searchType === "name") {
        if (collegeName) params.push(`college=${collegeName}`);
        if (limit) params.push(`limit=${limit}`);
    } else {
        if (schoolScore) params.push(`school=${schoolScore}`);
        if (quduratScore) params.push(`qudurat=${quduratScore}`);
    }
    if (tags.length > 0) params.push(`tags=${tags.join(",")}`);
    if (types.length > 0) params.push(`types=${types.join(",")}`);
    if (params.length > 0) {
        return `${window.location.href}?${params.join("&")}`;
    }
    return window.location.href;
}

export default GetFiltersPermalink;
