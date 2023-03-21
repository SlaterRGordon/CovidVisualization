import { useState, useEffect } from 'react'
import FeatureSelect from './components/FeatureSelect';
import ProvinceDetail from "./components/provinceDetail/ProvinceDetail"
import ProvinceOverview from './components/provinceOverview/ProvinceOverview';
import Select from './components/Select';
import Slider from './components/Slider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from '@mui/material';

const options = {
  'BC': { value: 'BC', label: 'British Columbia', color: '#0052CC' },
  'AB': { value: 'AB', label: 'Alberta', color: '#5243AA' },
  'MB': { value: 'MB', label: 'Manitoba', color: '#5243AA' },
  'NB': { value: 'NB', label: 'New Brunswick', color: '#FF8B00' },
  'NL': { value: 'NL', label: 'Newfoundland', color: '#FFC400' },
  'NS': { value: 'NS', label: 'Nova Scotia', color: '#36B37E' },
  'NT': { value: 'NT', label: 'Northwest Territories', color: '#8250C4' },
  'NU': { value: 'NU', label: 'Nunavut', color: '#73B761' },
  'ON': { value: 'ON', label: 'Ontario', color: '#FEB5DA' },
  'PE': { value: 'PE', label: 'PEI', color: '#0EB194' },
  'QC': { value: 'QC', label: 'Quebec', color: '#536F18' },
  'SK': { value: 'SK', label: 'Saskatchewan', color: '#5B2071' },
  'YT': { value: 'YT', label: 'Yukon', color: '#ECC846' },
}

function App() {
  const [overview, setOverview] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState({ value: 'MonthlyCases', label: 'Cases', color: '#5243AA' });
  const [selected, setSelected] = useState([]);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2020);

  const handleSelectChange = (selectOptions) => {
    setSelected(selectOptions)
  };

  const handleSelectFeatureChange = (selectOptions) => {
    setSelectedFeature(selectOptions)
  };

  const handleSliderChange = (event: Event, newValue: number) => {
    const newMonth = (newValue % 12) + 1;
    const newYear = 2020 + Math.floor(newValue / 12);

    setMonth(newMonth);
    setYear(newYear);
  };

  const handleBarClick = (e: any) => {
    setSelected([options[e.name.toString()]]);
  };

  const handleCloseDetail = () => {
    setSelected([]);
    setSelectedFeature({ value: 'MonthlyCases', label: 'Cases', color: '#5243AA' })
  };

  useEffect(() => {
    if(selected.length > 0) {
      setOverview(false);
    } else {
      setOverview(true);
    }
  }, [selected])

  return (
    <div className="flex w-full h-full bg-gray-400 justify-center items-center">
      <div className="relative flex flex-col w-8/12 h-10/12 justify-center items-center bg-gray-200 p-8 rounded-lg">
        <div className="flex w-full justify-center my-8">
          {!overview ?
            <Select selected={selected} handleSelectChange={handleSelectChange} />
            :
            <FeatureSelect selected={selectedFeature} handleSelectChange={handleSelectFeatureChange} />
          }
        </div>
        <div className="flex w-full justify-center my-8">
          <Slider handleSliderChange={handleSliderChange} />
        </div>
        <div className='flex w-full'>
          {overview ?
            <ProvinceOverview feature={selectedFeature} month={month} year={year} handleBarClick={handleBarClick} />
            :
            <ProvinceDetail provinces={selected} month={month} year={year} />
          }
        </div>
        {!overview &&
          <div className='absolute left-0 top-0 p-8'>
              <IconButton onClick={handleCloseDetail}>
                <ArrowBackIcon />
              </IconButton>
          </div>
        }
      </div>
    </div>
  )
}

export default App
