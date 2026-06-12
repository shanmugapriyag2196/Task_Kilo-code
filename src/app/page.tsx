import Link from "next/link";
import { BarChart3, CalendarDays, TrendingUp } from "lucide-react";
import { getWeeklyStats } from "@/lib/data";

export default function Home() {
  const weeklyStats = getWeeklyStats();

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-6xl flex-col items-center py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Task Performance Dashboard
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Track your daily and weekly task performance with detailed analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Total Tasks</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{weeklyStats.totalTasks}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{weeklyStats.completedTasks}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-6 h-6 text-amber-600" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Completion Rate</h3>
            </div>
            <p className="text-3xl font-bold text-amber-600">{weeklyStats.completionRate}%</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/dashboard/daily"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Daily View
          </Link>
          <Link
            href="/dashboard/weekly"
            className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Weekly View
          </Link>
        </div>
      </main>
    </div>
  );
}