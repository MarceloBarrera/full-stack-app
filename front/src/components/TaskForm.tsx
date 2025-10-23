import { useState } from "react";
import axios from "axios";
import { Button, Field, Input, Stack } from "@chakra-ui/react";

export const TaskForm = ({ onAdd }: { onAdd: () => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/tasks", {
      title,
      status: "pending",
    });
    setTitle("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={4} width="500px">
        <Field.Root>
          <Field.Label>Task</Field.Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </Field.Root>

        <Button type="submit" alignSelf="flex-end">
          Add Task
        </Button>
      </Stack>
    </form>
  );
};
