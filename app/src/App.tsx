import { useState, useEffect } from 'react'
import ProvinceDetail from "./components/provinceDetail/ProvinceDetail"
import Select from './components/Select';
import Slider from './components/Slider';

function App() {
  const [selected, setSelected] = useState([{value: "BC", label: "British Columbia", color: "#0052CC"}]);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2020);

  const handleSelectChange = (selectOptions) => {
    setSelected(selectOptions)
  };

  const handleSliderChange = (event: Event, newValue: number) => {
      const newMonth = (newValue % 12) + 1;
      const newYear = 2020 + Math.floor(newValue / 12);

      setMonth(newMonth);
      setYear(newYear);
  };

  return (
    <div className="flex w-full h-full bg-gray-400 justify-center items-center">
      <div className="flex flex-col w-8/12 h-10/12 justify-center items-center bg-gray-200 p-8 rounded-lg">
        <div className="flex w-full justify-center my-8">
            <Select selected={selected} handleSelectChange={handleSelectChange} />
        </div>
        <div className="flex w-full justify-center my-8">
            <Slider handleSliderChange={handleSliderChange} />
        </div>
        <div className='flex w-full'>
          <ProvinceDetail provinces={selected} month={month} year={year} />
        </div>
      </div>
    </div>
  )
}

export default App
