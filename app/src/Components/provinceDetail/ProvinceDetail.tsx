import { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { getData } from '../../utils/parseData';
import { months } from '../../utils/types';
import ProvinceChart from './ProvinceChart';

const ProvinceDetail = ({ provinces, month, year }) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            getData(provinces, month, year).then(response => {
                if (!isCancelled) {
                    var newData = [];
                    response.forEach((dataArray, index) => {
                        dataArray.forEach((element, i) => {
                            if (newData[i]) {
                                newData[i]["name"] = months[element.Month].slice(0,3);
                                newData[i][`mc${index}`] = parseInt(element.MonthlyCases);
                                newData[i][`md${index}`] = parseInt(element.MonthlyDeaths);
                                newData[i][`mh${index}`] = parseInt(element.MonthlyHospitalized);
                                newData[i][`mi${index}`] = parseInt(element.MonthlyICU);
                            } else {
                                var dataPoint = {};
                                dataPoint["name"] = months[element.Month].slice(0,3);
                                dataPoint[`mc${index}`] = parseInt(element.MonthlyCases);
                                dataPoint[`md${index}`] = parseInt(element.MonthlyDeaths);
                                dataPoint[`mh${index}`] = parseInt(element.MonthlyHospitalized);
                                dataPoint[`mi${index}`] = parseInt(element.MonthlyICU);
        
                                newData.push(dataPoint);
                            }
                        })
                    });

                    setData(newData);
                }
            })
        }

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [provinces, month, year])

    return (
        <div className="flex flex-grow">
            {data.length > 0 &&
                <div className='flex flex-col flex-grow'>
                    <div className='flex flex-grow'>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly Cases</Typography>
                            <ProvinceChart name="Monthly Cases" data={data} dataKey="mc" selected={provinces} domain={[0, 60000]} />
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly Deaths</Typography>
                            <ProvinceChart name="Monthly Deaths" data={data} dataKey="md" selected={provinces} domain={[0, 600]} />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly Hospitalized</Typography>
                            <ProvinceChart name="Monthly Hospitalized" data={data} dataKey="mh" selected={provinces} domain={[-600, 600]}/>
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly ICU</Typography>
                            <ProvinceChart name="Monthly ICU" data={data} dataKey="mi" selected={provinces} domain={[-80, 80]}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProvinceDetail;