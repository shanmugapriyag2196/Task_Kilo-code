export type TaskStatus = "pending" | "in-progress" | "completed" | "blocked";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  estimatedHours?: number;
  actualHours?: number;
};

export type DailyStats = {
  date: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  blockedTasks: number;
  productivityScore: number;
};

export type WeeklyStats = {
  weekStart: string;
  weekEnd: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  dailyStats: DailyStats[];
};

export type TaskPerformance = {
  daily: DailyStats[];
  weekly: WeeklyStats[];
};