import { useEffect, useState } from "react";
import { getData } from '../../utils/parseData';
import { months } from '../../utils/types';
import ProvinceChart from './ProvinceChart';
import Slider from "../Slider";

const ProvinceDetail = ({ province }) => {
    const [data, setData] = useState<any[]>([]);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2020);

    const handleSliderChange = (event: Event, newValue: number) => {
        const newMonth = (newValue % 12) + 1;
        const newYear = 2020 + Math.floor(newValue / 12);

        setMonth(newMonth);
        setYear(newYear);
    };

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            getData(province, month, year).then(response => {
                if (!isCancelled) {
                    var newData = [];
                    response.slice(0, 12).forEach(element => {
                        console.log(element);
                        var dataPoint = {
                            "name": months[element.Month].slice(0,3),
                            "mc": parseInt(element.MonthlyCases),
                            "md": parseInt(element.MonthlyDeaths),
                            "mh": parseInt(element.MonthlyHospitalized),
                            "mi": parseInt(element.MonthlyICU),
                        };

                        newData.push(dataPoint);
                    });

                    console.log(newData);
                    setData(newData);
                }
            })
        }

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [province, month, year])

    return (
        <div className="w-8/12">
            <div className="flex w-full justify-center my-8">
                <Slider handleSliderChange={handleSliderChange} />
            </div>
            {data.length > 0 &&
                <div className='w-full'>
                    <ProvinceChart data={data} dataKey="mc" color="#0088FE" domain={[0, 60000]} />
                    <ProvinceChart data={data} dataKey="md" color="#00C49F" domain={[0, 600]}/>
                    <ProvinceChart data={data} dataKey="mh" color="#FFBB28" domain={[-600, 600]}/>
                    <ProvinceChart data={data} dataKey="mi" color="#FF8042" domain={[-80, 80]}/>
                </div>
            }
        </div>
    );
}

export default ProvinceDetail;