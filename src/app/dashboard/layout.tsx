import Link from "next/link";
import { BarChart3, CalendarDays, Home } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-zinc-50">
            <Home className="w-5 h-5" />
            Task Dashboard
          </Link>
          <div className="flex gap-2">
            <Link
              href="/dashboard/daily"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Daily
            </Link>
            <Link
              href="/dashboard/weekly"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Weekly
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-6xl mx-auto w-full py-8 px-4">
        {children}
      </main>
    </div>
  );
}