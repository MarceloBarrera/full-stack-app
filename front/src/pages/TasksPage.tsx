import { useEffect, useState } from "react";
import axios from "axios";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import type { Task } from "../api/models/Task";
import { Box, Heading, NativeSelect, Stack } from "@chakra-ui/react";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
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

        <label>Filter by status: </label>

        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value as typeof filter)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Box marginTop={8} marginBottom={8}>
          <hr />
        </Box>

        <TaskList tasks={tasks} onUpdate={fetchTasks} filter={filter} />
      </Stack>
    </>
  );
}

export default TasksPage;
