"use client";

import { DailyStats } from "@/types/task";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DailyChartProps {
  data: DailyStats[];
}

export function DailyBarChart({ data }: DailyChartProps) {
  const chartData = data.map((d) => ({
    date: d.date.split("-")[1] + "/" + d.date.split("-")[2],
    Completed: d.completedTasks,
    InProgress: d.inProgressTasks,
    Pending: d.pendingTasks,
    Blocked: d.blockedTasks,
  }));

  return (
    <div className="w-full" style={{ height: 300 }}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Completed" fill="#22c55e" />
        <Bar dataKey="InProgress" fill="#3b82f6" />
        <Bar dataKey="Pending" fill="#f59e0b" />
        <Bar dataKey="Blocked" fill="#ef4444" />
      </BarChart>
    </div>
  );
}