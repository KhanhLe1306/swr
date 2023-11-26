import useSWR, { SWRResponse } from "swr";
import { getTodos } from "../axios/todos";

export const useTodos = () => useSWR({ url: "/todos" }, getTodos);
