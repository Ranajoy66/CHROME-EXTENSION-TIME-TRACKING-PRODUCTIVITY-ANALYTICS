// src/components/Chart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Chart({ productive, unproductive }) {
  const data = [
    { name: "Productive", value: productive },
    { name: "Unproductive", value: unproductive },
  ];

  const COLORS = ["#00C49F", "#FF4C4C"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={400} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}