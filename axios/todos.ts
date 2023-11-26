import { Todo } from "@/app/todos/[id]/page";
import { client } from "./client";

const delay = () => new Promise((res) => setTimeout(() => res(""), 1000));

export const getTodos = async ({ url }: { url: string }) => {
  await delay();
  return (await client.get<Todo[]>(url)).data;
};

export const getTodo = async ({ url, id }: { url: string; id: number }) => {
  await delay();
  return (await client.get<Todo>(`${url}/${id}`)).data;
};

export const addTodo = async (
  newTodo: Pick<Todo, "completed" | "description">
) => {
  await delay();
  if (Math.random() < 0.5) throw new Error("Failed");
  return (await client.post<Todo>("/todos", newTodo)).data;
};

export const deleteTodo = async (id: number) => {
  await delay();
  if (Math.random() < 0.5) throw new Error("Failed");
  return (await client.delete(`/todos/${id}`)).data;
};

export const updateTodo = async (todo: Todo) => {
  await delay();
  if (Math.random() < 0.5) throw new Error("Failed");
  return (await client.put<Todo>(`/todos/${todo.id}`, todo)).data;
};
