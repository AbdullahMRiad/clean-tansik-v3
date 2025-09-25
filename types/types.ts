export type CollegeKind = "university" | "institute" | "affiliated" | "unknown"

export type College = {
    name: string
    score: number
    major: string
    kind: CollegeKind
}

export type Gender = "boys" | "girls"

export type YearSelection = {
    year: number
    gender: Gender
}

export type Dataset = College[]