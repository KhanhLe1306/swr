"use client";

import React from "react";
import useSWR from "swr";
import { client } from "../../../axios/client";
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import AddForm from "./addForm";
import Link from "next/link";
import { useTodos } from "../../../swr/useTodos";
import { Toaster } from "react-hot-toast";
import { useTodo } from "../../../swr/useTodo";
import TodoComponent from "../../../components/Todo";

const MainCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "lightgrey",
});

type Todo = {
  id: number;
  description: string;
};

function Todos() {
  const todos = useTodos();

  console.log("todos", todos.data);
  return (
    <MainCard sx={{ mt: 8, p: 8 }}>
      {todos.isLoading ? (
        <Box>Loading... </Box>
      ) : (
        <Stack>
          <Toaster toastOptions={{ position: "top-center" }} />
          <Box mb={1}>
            <AddForm />
          </Box>
          <Stack gap={1}>
            {todos.data
              ?.sort((a, b) => b.id - a.id)
              .map((todo) => (
                <TodoComponent todo={todo} />
              ))}
          </Stack>
        </Stack>
      )}
    </MainCard>
  );
}

export default Todos;
