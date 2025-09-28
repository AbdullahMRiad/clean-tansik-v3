import { createContext, useState } from "react"

import type { College, Gender, Year } from "../types/types"

import CardsContainer from "./components/cards"
import DataSelector from "./components/filters/dataselect"
import FiltersSection from "./components/filters/filters"
import TagsSection from "./components/filters/tags"
import StatsSection from "./components/stats"

import * as _2025b from "../data/json/2025b.json"

export const AppContext = createContext<{
  gender: Gender
  setGender: React.Dispatch<React.SetStateAction<Gender>>
  year: Year
  setYear: React.Dispatch<React.SetStateAction<Year>>
  data: College[]
  setData: React.Dispatch<React.SetStateAction<College[]>>
} | undefined>(undefined)

function App() {

  const [gender, setGender] = useState<  Gender >("boys")
  const [ year ,  setYear ] = useState<   Year  >( 2025 )
  const [ data ,  setData ] = useState<College[]>(_2025b as College[])

  return (
    <AppContext.Provider value={{gender, setGender, year, setYear, data, setData}}>
      <div className="flex flex-col w-full">
        <header className="text-center text-3xl font-bold p-3! panel">تنسيق الجامعات المصرية للشهادة السعودية</header>
        <DataSelector/>
        <FiltersSection/>
        <TagsSection/>
        <StatsSection/>
        <CardsContainer/>
      </div>
    </AppContext.Provider>
  )
}

export default App
