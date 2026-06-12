import { Task } from "@/types/task";
import { CheckCircle, Clock, Circle, AlertCircle } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
}

const statusIcons = {
  completed: CheckCircle,
  "in-progress": Clock,
  pending: Circle,
  blocked: AlertCircle,
};

const statusColors = {
  completed: "text-green-600",
  "in-progress": "text-blue-600",
  pending: "text-amber-600",
  blocked: "text-red-600",
};

const priorityColors = {
  low: "bg-zinc-100 text-zinc-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const Icon = statusIcons[task.status];
        return (
          <div
            key={task.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${statusColors[task.status]}`} />
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
              <span>Created: {task.createdAt.toLocaleDateString()}</span>
              {task.completedAt && (
                <span>Completed: {task.completedAt.toLocaleDateString()}</span>
              )}
              {task.actualHours && (
                <span>Time: {task.actualHours}h / {task.estimatedHours}h</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}