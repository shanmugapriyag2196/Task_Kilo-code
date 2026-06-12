"use client";

import { WeeklyLineChart } from "@/components/WeeklyLineChart";
import { getWeeklyStats, getTasks, timesheetEntries } from "@/lib/data";
import { TaskList } from "@/components/TaskList";

export default function WeeklyDashboard() {
  const weeklyData = [getWeeklyStats()];
  const tasks = getTasks();
  const weeklyTimesheet = timesheetEntries.filter(
    (e) => e.date >= weeklyData[0].weekStart && e.date <= weeklyData[0].weekEnd
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Weekly Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Tasks</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{weeklyData[0].totalTasks}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Completed</p>
          <p className="text-2xl font-bold text-green-600">{weeklyData[0].completedTasks}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Completion Rate</p>
          <p className="text-2xl font-bold text-amber-600">{weeklyData[0].completionRate}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Weekly Timesheet Summary
        </h3>
        {weeklyTimesheet.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {weeklyTimesheet.map((entry, i) => (
              <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex justify-between items-start">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{entry.task}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{entry.description}</p>
                  <p className="text-xs text-zinc-500">{entry.date}</p>
                </div>
                <span className="text-sm font-semibold text-blue-600">{entry.hours}h</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">No timesheet entries for this week</p>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Weekly Trend
        </h3>
        <WeeklyLineChart data={weeklyData} />
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Active Tasks
        </h3>
        <TaskList tasks={tasks.filter((t) => t.status !== "completed")} />
      </div>
    </div>
  );
}