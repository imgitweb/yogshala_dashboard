import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
} from "recharts";

const DynamicAreaChart = ({ title, dataSets, dataKey = "value", yDomain = [0, "auto"], height = 250 }) => {
  const [timeframe, setTimeframe] = useState("weekly");

  const data = timeframe === "weekly" ? dataSets.weekly : dataSets.monthly;

  // Custom Active Dot
  const CustomActiveDot = ({ cx, cy, stroke, r }) => (
    <Dot cx={cx} cy={cy} r={r + 3} fill="white" stroke={stroke} strokeWidth={2} />
  );

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-light p-3 rounded-lg shadow-lg border border-light text-dark font-sans">
          <p className="text-sm font-semibold mb-1">{label}</p>
          <p className="text-lg font-bold text-primary">
            {typeof payload[0].value === "number" ? `$${payload[0].value.toFixed(2)}` : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-light p-5 rounded-xl border border-light font-sans hover-lift">
      {/* Header with Title and Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-dark">{title}</h2>
        <div className="flex items-center bg-offwhite p-1 rounded-lg gap-1.5">
          <button
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${
              timeframe === "weekly" ? "bg-primary text-white shadow" : "text-muted bg-[#f0f0f0]"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${
              timeframe === "monthly" ? "bg-primary text-white shadow" : "text-muted bg-[#f0f0f0]"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="dynamicAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-light)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--primary-light)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} domain={yDomain} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-light)", strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="var(--primary)"
              fillOpacity={1}
              fill="url(#dynamicAreaGradient)"
              strokeWidth={2}
              dot={{ stroke: "var(--primary)", strokeWidth: 1, r: 4, fill: "white" }}
              activeDot={<CustomActiveDot stroke="var(--primary)" r={4} />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DynamicAreaChart;
