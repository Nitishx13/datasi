"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DailyTrendPoint } from "@/lib/mockData";

export default function SpendConversionsChart({
  data,
}: {
  data: DailyTrendPoint[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 12 }} />
          <YAxis
            yAxisId="spend"
            tick={{ fill: "#71717a", fontSize: 12 }}
            tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          />
          <YAxis
            yAxisId="conv"
            orientation="right"
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e4e4e7",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
            formatter={(value, name) => {
              if (name === "Spend") return [`₹ ${value}`, name];
              return [value, name];
            }}
          />
          <Legend />
          <Line
            yAxisId="spend"
            type="monotone"
            dataKey="spend"
            name="Spend"
            stroke="#0f172a"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="conv"
            type="monotone"
            dataKey="conversions"
            name="Conversions"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
