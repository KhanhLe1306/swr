"use client";

import { addTodoMutation, addTodoOptions } from "@/mutations/todoMutations";
import { TextField, Button, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import { Todo } from "./[id]/page";
import { useTodos } from "../../../swr/useTodos";
import toast from "react-hot-toast";

type AddFormValues = {
  description: string;
};

const AddForm = () => {
  const { data: todos, mutate } = useTodos();
  const handleSubmit = async (
    values: AddFormValues,
    { resetForm }: { resetForm: any }
  ) => {
    try {
      const newTodo: Todo = {
        id: 999999,
        description: values.description,
        completed: false,
      };
      await mutate(
        addTodoMutation(newTodo, todos || []),
        addTodoOptions(newTodo, todos || [])
      );
      toast.success("New todo added");
    } catch (e) {
      toast.error("Failed to add to do");
    } finally {
      resetForm();
    }
  };
  const initialValues: AddFormValues = {
    description: "",
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values: { description }, handleChange }) => (
        <Form>
          <Stack direction={"row"}>
            <TextField
              fullWidth
              name="description"
              value={description}
              onChange={handleChange}
              size="small"
            />
            <Button type="submit">Add</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
