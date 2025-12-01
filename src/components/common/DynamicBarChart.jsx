import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Optional: RoundedBar for custom shapes
const RoundedBar = (props) => {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} rx={6} fill={fill} />;
};

const DynamicBarChart = ({
  title,
  dataSets, // { weekly: [...], monthly: [...] } or any keys
  keys = ["value"], // array of data keys to show
  labels = { weekly: "Weekly", monthly: "Monthly" }, // optional toggle labels
  height = 250,
  maxY = null, // optional max y-axis
  showPattern = false,
}) => {
  const dataKeys = Object.keys(dataSets);
  const [currentKey, setCurrentKey] = useState(dataKeys[0]);
  const data = dataSets[currentKey];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark text-white p-2 px-3 rounded-md shadow-lg">
          <p className="font-bold">{`${label}`}</p>
          {payload.map((p) => (
            <p className="text-sm" key={p.dataKey}>
              {`${p.dataKey}: ${p.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full  bg-light p-5 rounded-xl border border-light font-sans hover-lift">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-dark">{title}</h2>
        {dataKeys.length > 1 && (
          <div className="flex items-center bg-offwhite p-1 rounded-lg">
            {dataKeys.map((key) => (
              <button
                key={key}
                onClick={() => setCurrentKey(key)}
                className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${
                  currentKey === key ? "bg-dark text-white shadow" : "text-muted"
                }`}
              >
                {labels[key] || key}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }} barCategoryGap="35%">
            {/* Optional Stripe Pattern */}
            {showPattern && (
              <defs>
                <pattern id="stripePattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <path d="M 0,4 l 8,0" stroke="#375f5f" strokeWidth="5" />
                </pattern>
              </defs>
            )}

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              domain={[0, maxY || "auto"]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />

            {keys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                shape={<RoundedBar />}
                fill={showPattern ? "url(#stripePattern)" : "var(--primary)"}
                background={{ fill: "#f0f0f0", shape: <RoundedBar /> }}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DynamicBarChart;
