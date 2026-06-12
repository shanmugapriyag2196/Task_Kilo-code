"use client";

import { DailyBarChart } from "@/components/DailyBarChart";
import { getTasks, getDailyStats, saveTimesheetEntry } from "@/lib/data";
import { TaskList } from "@/components/TaskList";
import { useState } from "react";

export default function DailyDashboard() {
  const dailyStats = getDailyStats(new Date().toISOString().split("T")[0]);
  const tasks = getTasks();
  const [timesheet, setTimesheet] = useState({
    task: "",
    hours: "",
    description: "",
  });
  const [savedEntries, setSavedEntries] = useState<Array<{task: string, hours: string, description: string, date: string}>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timesheet.task && timesheet.hours) {
      const entry = {
        ...timesheet,
        date: new Date().toISOString().split("T")[0],
      };
      saveTimesheetEntry(entry);
      setSavedEntries([...savedEntries, entry]);
      setTimesheet({ task: "", hours: "", description: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Daily Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Tasks</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{dailyStats.totalTasks}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Completed</p>
          <p className="text-2xl font-bold text-green-600">{dailyStats.completedTasks}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{dailyStats.inProgressTasks}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Productivity Score</p>
          <p className="text-2xl font-bold text-amber-600">{dailyStats.productivityScore}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Timesheet Entry
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Task Name
              </label>
              <input
                type="text"
                value={timesheet.task}
                onChange={(e) => setTimesheet({...timesheet, task: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                placeholder="Enter task name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={timesheet.hours}
                onChange={(e) => setTimesheet({...timesheet, hours: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                placeholder="Hours worked"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              value={timesheet.description}
              onChange={(e) => setTimesheet({...timesheet, description: e.target.value})}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
              placeholder="What did you work on?"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Entry
          </button>
        </form>
      </div>

      {savedEntries.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            Today&apos;s Timesheet
          </h3>
          <div className="space-y-2">
            {savedEntries.map((entry, i) => (
              <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{entry.task}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{entry.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{entry.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Task Status Distribution
        </h3>
        <DailyBarChart data={[dailyStats]} />
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Today&apos;s Tasks
        </h3>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}