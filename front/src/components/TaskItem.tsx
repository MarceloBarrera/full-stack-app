import axios from "axios";
import type { Task } from "../api/models/Task";
import { Box, IconButton, Stack, Switch, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export const TaskItem = ({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  const toggleStatus = async () => {
    await axios.put(`http://localhost:3001/tasks/${task.id}`, {
      ...task,
      status: task.status === "pending" ? "completed" : "pending",
    });
    onUpdate();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:3001/tasks/${task.id}`);
    onUpdate();
  };

  return (
    <Stack
      direction="row"
      gap={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box width="150px">
        <Text>{task.title}</Text>
      </Box>
      <Box width="150px">
        <Text>{task.status}</Text>
      </Box>

      <Switch.Root
        colorPalette="green"
        checked={checked}
        onCheckedChange={() => {
          toggleStatus();
          setChecked(!checked);
        }}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
      <IconButton
        aria-label="Delete task"
        key={task.id}
        colorPalette="red"
        onClick={deleteTask}
        size="sm"
        variant="outline"
        border="1px solid"
        borderColor="red.500"
        _hover={{
          bg: "red.500",
          color: "white",
        }}
      >
        <MdDeleteForever />
      </IconButton>
    </Stack>
  );
};
