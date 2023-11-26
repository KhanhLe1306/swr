import useSWR from "swr";
import { getTodo } from "../axios/todos";

export const useTodo = (id: number) =>
  useSWR({ url: `/todos`, id: id }, getTodo);
