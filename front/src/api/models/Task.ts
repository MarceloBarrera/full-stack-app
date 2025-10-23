import type { TaskStatus } from "./TaskStatus";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};
