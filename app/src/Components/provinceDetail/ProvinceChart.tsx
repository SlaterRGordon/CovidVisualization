import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProvinceChart = ({ data, dataKey, color, domain }) => {

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                width={500}
                height={200}
                data={data}
                syncId="syncID"
            >
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="name" type="category" />
                <YAxis interval={0} type="number" domain={domain} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} isAnimationActive={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ProvinceChart;