import { Todo } from "@/app/todos/[id]/page";
import { Card, Checkbox, IconButton, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, SyntheticEvent } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { mutate } from "swr";
import { deleteTodo } from "../axios/todos";
import {
  deleteTodoMutation,
  deleteTodoOptions,
  updateTodoOptions,
  updateTodoMutation,
} from "@/mutations/todoMutations";
import { useTodos } from "../swr/useTodos";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
  todo: Todo;
};

function Todo({ todo }: Props) {
  const { data: todos, mutate } = useTodos();
  const handleChange = async (e: BaseSyntheticEvent) => {
    try {
      await mutate(
        updateTodoMutation(
          { ...todo, completed: e.target.checked },
          todos || []
        ),
        updateTodoOptions({ ...todo, completed: e.target.checked }, todos || [])
      );
      toast.success("Todo updated");
    } catch (e) {
      toast.error("Failed to update todo");
    }
  };
  const handleDelete = async () => {
    try {
      await mutate(
        deleteTodoMutation(todo.id, todos || []),
        deleteTodoOptions(todo.id, todos || [])
      );
      toast.success("Todo deleted");
    } catch (e) {
      toast.error("Failed to delete todo!");
    }
  };
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Checkbox checked={todo.completed} onChange={handleChange} />
      <Link href={`/todos/${todo.id}`}>{todo.description}</Link>
      <IconButton onClick={handleDelete}>
        <DeleteForeverIcon />
      </IconButton>
    </Card>
  );
}

export default Todo;
