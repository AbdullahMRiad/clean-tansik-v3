type College = {
    name: string,
    score: number,
    major: string,
    type: "uni" | "high-inst" | "aff" | "unknown"
}

type Year = {
    colleges: College[],
    year: number,
    gender: "boys" | "grils"
}

type Data = Year[]