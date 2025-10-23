import { useState } from "react";
import axios from "axios";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm, type FieldValues } from "react-hook-form";

export const TaskForm = ({ onAdd }: { onAdd: () => void }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
    },
  });

  const handleSubmitToApi = async (data: FieldValues) => {
    await axios.post("http://localhost:3001/tasks", {
      title: data.title,
      status: "pending",
    });
    reset();
    setHasSubmitted(false); // Reset after successful submission
    onAdd();
  };

  const onSubmit = (data: FieldValues) => {
    handleSubmitToApi(data);
  };

  const onError = () => {
    setHasSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack direction="row" gap={4} width="500px">
        <Field.Root invalid={!!errors.title && hasSubmitted}>
          <Field.Label>
            Task
            <span style={{ color: "red" }}>*</span>
          </Field.Label>
          <Field.ErrorText>
            <>{errors.title && hasSubmitted && errors.title.message}</>
          </Field.ErrorText>
          <Input
            placeholder="Task title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
        </Field.Root>

        <Button type="submit" alignSelf="flex-end">
          Add Task
        </Button>
      </Stack>
    </form>
  );
};
