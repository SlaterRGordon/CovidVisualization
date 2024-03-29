import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const ProvinceChart = ({ data, dataKey, selected, domain, referenceLines }) => {

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                width={300}
                height={200}
                data={data}
                syncId="syncID"
            >
                <CartesianGrid stroke="#FFFFFF" strokeDasharray="3 3" />
                <XAxis dataKey="name" type="category" />
                <YAxis interval={0} type="number" domain={domain} />
                <Tooltip />
                <Legend />
                {selected.map((selectOption, index) => {
                    return <Line key={index} type="monotone" name={`${selectOption.label}`} dataKey={`${dataKey}${index}`} stroke={selectOption.color} strokeWidth={3} isAnimationActive={false} />;
                })}
                {referenceLines.map((line, index) => {
                    return line;
                })}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ProvinceChart;