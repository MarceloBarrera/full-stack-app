import type { Task } from "../api/models/Task";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  onUpdate,
  filter,
}: {
  tasks: Task[];
  onUpdate: () => void;
  filter: string;
}) => {
  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );
  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
};
