import DataSelector from "./components/filters/dataselect"
import FiltersSection from "./components/filters/filters"

function App() {
  return (
    <>
      <div className="flex flex-col w-full">
        <header className="text-center text-3xl font-bold p-3! panel">تنسيق الجامعات المصرية للشهادة السعودية</header>
        <DataSelector/>
        <FiltersSection/>
        <div id="cards-container"></div>
      </div>
    </>
  )
}

export default App
