import CardsContainer from "./components/cards"
import DataSelector from "./components/filters/dataselect"
import FiltersSection from "./components/filters/filters"
import TagsSection from "./components/filters/tags"
import StatsSection from "./components/stats"

function App() {
  return (
    <>
      <div className="flex flex-col w-full">
        <header className="text-center text-3xl font-bold p-3! panel">تنسيق الجامعات المصرية للشهادة السعودية</header>
        <DataSelector/>
        <FiltersSection/>
        <TagsSection/>
        <StatsSection/>
        <CardsContainer/>
      </div>
    </>
  )
}

export default App
