import { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { getData } from '../../utils/parseData';
import { months } from '../../utils/types';
import ProvinceChart from './ProvinceChart';
import { ReferenceArea } from "recharts";

const ProvinceDetail = ({ provinces, month, year }) => {
    const [data, setData] = useState<any[]>([]);
    const [referenceAreas, setReferenceAreas] = useState<any[]>([]);

    const checkLockdown = () => {
        if (year == 2020 && month <= 3) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={'Mar'} x2={'May'} />])
        } else if (year == 2020 && month < 5) {
            console.log(months[month])
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={months[month].slice(0,3)} x2={'May'} />])
        }

        if (year == 2020 && month == 2) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={'Dec'} x2={'Jan'} />])
        }
        else if (year == 2020 && month <= 12 && month > 2) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={'Dec'} x2={'Feb'} />])
        } else if (year == 2021 && month < 2) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={months[month].slice(0,3)} x2={'Feb'} />])
        }
        if (year == 2020 && month > 5) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={'Apr'} x2={months[month == 1 ? 12 : month - 1].slice(0,3)} />])
        } else if (year == 2021 && month <= 4) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={'Apr'} x2={months[month == 1 ? 12 : month - 1].slice(0,3)} />])
        } else if ((year == 2021 && month > 4) || (year == 2022)) {
            setReferenceAreas(prev => [...prev, <ReferenceArea x1={months[month].slice(0,3)} x2={'Mar'} />])
        } 
    }

    useEffect(() => {
        setReferenceAreas([]);
        checkLockdown();
    }, [month, year])

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
                            <ProvinceChart data={data} dataKey="mc" selected={provinces} domain={[0, 60000]} referenceLines={referenceAreas} />
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly Deaths</Typography>
                            <ProvinceChart data={data} dataKey="md" selected={provinces} domain={[0, 600]} referenceLines={referenceAreas} />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly Hospitalized</Typography>
                            <ProvinceChart data={data} dataKey="mh" selected={provinces} domain={[-600, 600]} referenceLines={referenceAreas} />
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Typography fontSize={16} fontWeight={500}>Monthly ICU</Typography>
                            <ProvinceChart data={data} dataKey="mi" selected={provinces} domain={[-80, 80]} referenceLines={referenceAreas} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProvinceDetail;