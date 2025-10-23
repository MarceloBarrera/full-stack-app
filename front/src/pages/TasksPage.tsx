import { useEffect, useState } from "react";
import axios from "axios";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import type { Task } from "../api/models/Task";
import { Heading, Stack } from "@chakra-ui/react";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Heading>Task Tracker</Heading>

      <Stack alignSelf="center" justifySelf="center">
        <TaskForm onAdd={fetchTasks} />
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      </Stack>
    </>
  );
}

export default TasksPage;
