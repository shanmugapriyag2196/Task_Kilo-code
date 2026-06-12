"use client";

import { WeeklyStats } from "@/types/task";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface WeeklyLineChartProps {
  data: WeeklyStats[];
}

export function WeeklyLineChart({ data }: WeeklyLineChartProps) {
  const chartData = data.map((w) => ({
    week: w.weekStart.split("-")[1] + "/" + w.weekStart.split("-")[2],
    Total: w.totalTasks,
    Completed: w.completedTasks,
    Rate: w.completionRate,
  }));

  return (
    <div className="w-full" style={{ height: 300 }}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Total" stroke="#3b82f6" strokeWidth={2} />
        <Line yAxisId="left" type="monotone" dataKey="Completed" stroke="#22c55e" strokeWidth={2} />
        <Line yAxisId="right" type="monotone" dataKey="Rate" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </div>
  );
}