import { DailyBarChart } from "@/components/DailyBarChart";
import { getTasks, getDailyStats } from "@/lib/data";
import { TaskList } from "@/components/TaskList";

export default function DailyDashboard() {
  const dailyStats = getDailyStats(new Date().toISOString().split("T")[0]);
  const tasks = getTasks();

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