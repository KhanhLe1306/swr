"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { client } from "../../../../axios/client";
import Link from "next/link";
import { useTodo } from "../../../../swr/useTodo";
import { Form, Formik } from "formik";

export type Todo = {
  id: number;
  description: string;
  completed: boolean;
};

function Page({ params }: { params: { id: number } }) {
  const { data: todo, isLoading, isValidating } = useTodo(params.id);

  const initialValues = {
    description: todo?.description,
    completed: todo?.completed,
  };

  return (
    <Card sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      {isLoading ? (
        <Box>Loading... </Box>
      ) : (
        <Stack>
          <Link href={"/todos"}>/Todos</Link>
          <Box>
            <Typography>desciption: {todo?.description}</Typography>
            <Typography>completed: {todo?.completed.toString()}</Typography>
          </Box>

          {/* This 'isRevalidating' check should fix the issue of the form having the stale data
              because the form is not rendered until the data is up to date
          */}
          {isValidating ? (
            <Box>Revalidating...</Box>
          ) : (
            <Formik initialValues={initialValues} onSubmit={() => {}}>
              {({ values }) => (
                <Form>
                  <Typography>This is formik:</Typography>
                  <TextField
                    name={"description"}
                    label={"Description"}
                    value={values.description}
                  />
                  <Checkbox name="completed" checked={values.completed} />
                </Form>
              )}
            </Formik>
          )}
        </Stack>
      )}
    </Card>
  );
}

export default Page;
