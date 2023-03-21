import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOverviewData } from "../../utils/parseData";
import OverviewChart from "./OverviewChart";

const ProvinceOverview = ({ feature, month, year, handleBarClick }) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            getOverviewData(month, year).then(response => {
                if (!isCancelled) {
                    var newData = [];
                    console.log(response);
                    response.forEach((dataArray, index) => {
                        var dataPoint = {};
                        dataPoint["name"] = dataArray[0].Province;
                        dataPoint[`mc`] = dataArray[0][feature.value] ? parseInt(dataArray[0][feature.value]) : 0;
                        newData.push(dataPoint);
                    });

                    setData(newData);
                }
            })
        }

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [feature, month, year])

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className="flex flex-grow">
            {data.length > 0 &&
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <Typography fontSize={16} fontWeight={500}>{feature.label}</Typography>
                    <OverviewChart data={data} color={feature.color} handleBarClick={handleBarClick} /> 
                </div>   
            }
        </div>
    );
}

export default ProvinceOverview;