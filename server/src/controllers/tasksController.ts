import { Request, Response } from "express";

// Simple in-memory task storage for demonstration
// task status: completed, pending
enum TaskStatus {
  Completed = "completed",
  Pending = "pending",
}

// type task
type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

let tasks: Task[] = [];
let idCounter = 1;

export const getAllTasks = (_req: Request, res: Response) => {
  return res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const { title, status } = req.body;
  if (!title || title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  const task = { id: idCounter++, title, status };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map((t) => (t.id === id ? req.body : t));
  res.json(req.body);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).end();
};
