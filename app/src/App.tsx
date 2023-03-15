import ProvinceChart from "./components/provinceDetail/ProvinceChart"
import ProvinceDetail from "./components/provinceDetail/ProvinceDetail"

function App() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex w-8/12 h-full items-center">
        <ProvinceDetail province={"AB"} />
      </div>
    </div>
  )
}

export default App
