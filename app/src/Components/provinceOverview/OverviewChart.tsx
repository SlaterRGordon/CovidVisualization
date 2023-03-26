import { useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Brush, Bar, BarChart, ReferenceArea } from 'recharts';
import { provOptions } from '../../utils/types';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-300">
        <p className="label">{`${provOptions[label].label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const OverviewChart = ({ data, color, handleBarClick }) => {
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                    content={<CustomTooltip />}
                  />
                <Bar dataKey="mc" fill={color} onClick={handleBarClick} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default OverviewChart;