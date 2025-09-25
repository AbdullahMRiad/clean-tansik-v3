import { useEffect, useMemo, useState } from "react"
import DataSelector from "./components/filters/dataselect"
import FiltersSection from "./components/filters/filters"
import Card from "./components/card"
import type { College, CollegeKind, Dataset, Gender, YearSelection } from "../types/types"

function mapArabicTypeToKind(value: string): CollegeKind {
  if (value.includes("جامعة")) return "university"
  if (value.includes("معهد")) return "institute"
  if (value.includes("تابع")) return "affiliated"
  return "unknown"
}

function parseCollege(item: any): College {
  return {
    name: String(item["الكلية"] ?? "").trim(),
    score: Number(String(item["الدرجة"] ?? "0").replace(/[^0-9.]/g, "")) || 0,
    major: String(item["المجال"] ?? "").trim(),
    kind: mapArabicTypeToKind(String(item["النوع"] ?? "").trim())
  }
}

async function fetchDataset({ year, gender }: YearSelection): Promise<Dataset> {
  const suffix = gender === "boys" ? "b" : "g"
  const res = await fetch(`/json/${year}${suffix}.json`)
  if (!res.ok) throw new Error(`Failed to fetch dataset ${year}${suffix}`)
  const raw = await res.json()
  return Array.isArray(raw) ? raw.map(parseCollege) : []
}

function App() {
  const [selection, setSelection] = useState<YearSelection>({ year: 2025, gender: "boys" as Gender })
  const [data, setData] = useState<Dataset>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchDataset(selection)
      .then(d => { if (!cancelled) setData(d) })
      .catch(e => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [selection])

  const headerText = useMemo(() => `تنسيق الجامعات المصرية للشهادة السعودية`, [])
  return (
    <>
      <div className="flex flex-col w-full">
        <header className="text-center text-3xl font-bold p-3! panel">{headerText}</header>
        <DataSelector value={selection} onChange={setSelection} />
        <FiltersSection query={query} onQueryChange={setQuery} />
        <div id="cards-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
          {loading && <div className="panel">جارٍ التحميل…</div>}
          {error && <div className="panel text-red-700">حدث خطأ: {error}</div>}
          {!loading && !error && data
            .filter(c => {
              if (!query.trim()) return true
              const q = query.trim().toLowerCase()
              return (
                c.name.toLowerCase().includes(q) ||
                c.major.toLowerCase().includes(q) ||
                String(c.score).includes(q)
              )
            })
            .map((c, idx) => (
            <Card key={`${c.name}-${idx}`} college={c} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
