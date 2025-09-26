export type College = {
    name: string,
    score: number,
    major: string,
    type: "uni" | "high-inst" | "aff" | "unknown"
}

export type Year = {
    colleges: College[],
    year: number,
    gender: "boys" | "grils"
}

export type Data = Year[]
