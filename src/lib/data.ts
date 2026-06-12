import { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Dashboard UI Design",
    description: "Create responsive dashboard layout",
    status: "completed",
    priority: "high",
    createdAt: new Date("2026-06-10"),
    updatedAt: new Date("2026-06-11"),
    completedAt: new Date("2026-06-11"),
    estimatedHours: 4,
    actualHours: 3,
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connect to backend services",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2026-06-09"),
    updatedAt: new Date("2026-06-12"),
    estimatedHours: 6,
    actualHours: 4,
  },
  {
    id: "3",
    title: "Write Documentation",
    description: "Document all components",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2026-06-12"),
    updatedAt: new Date("2026-06-12"),
  },
  {
    id: "4",
    title: "Performance Testing",
    description: "Run load tests on components",
    status: "blocked",
    priority: "low",
    createdAt: new Date("2026-06-08"),
    updatedAt: new Date("2026-06-12"),
  },
  {
    id: "5",
    title: "Code Review",
    description: "Review PR #42",
    status: "completed",
    priority: "medium",
    createdAt: new Date("2026-06-11"),
    updatedAt: new Date("2026-06-11"),
    completedAt: new Date("2026-06-11"),
    estimatedHours: 1,
    actualHours: 1,
  },
  {
    id: "6",
    title: "Deploy to Production",
    description: "Deploy latest changes to Vercel",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2026-06-12"),
    updatedAt: new Date("2026-06-12"),
    estimatedHours: 0.5,
  },
];

export function getTasks(): Task[] {
  return mockTasks;
}

export function getDailyStats(date: string) {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  
  return {
    date,
    totalTasks: date === today ? 8 : date === yesterday ? 6 : 5,
    completedTasks: date === today ? 4 : date === yesterday ? 3 : 2,
    inProgressTasks: date === today ? 2 : date === yesterday ? 2 : 1,
    pendingTasks: date === today ? 1 : date === yesterday ? 1 : 2,
    blockedTasks: date === today ? 1 : date === yesterday ? 0 : 0,
    productivityScore: date === today ? 85 : date === yesterday ? 78 : 72,
  };
}

export function getWeeklyStats() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    const dateStr = date.toISOString().split("T")[0];
    days.push(getDailyStats(dateStr));
  }

  const totalTasks = days.reduce((sum, d) => sum + d.totalTasks, 0);
  const completedTasks = days.reduce((sum, d) => sum + d.completedTasks, 0);

  return {
    weekStart: days[0].date,
    weekEnd: days[6].date,
    totalTasks,
    completedTasks,
    completionRate: Math.round((completedTasks / totalTasks) * 100),
    dailyStats: days,
  };
}