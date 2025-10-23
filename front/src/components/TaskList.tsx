import type { Task } from "../api/models/Task";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  onUpdate,
}: {
  tasks: Task[];
  onUpdate: () => void;
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
};
