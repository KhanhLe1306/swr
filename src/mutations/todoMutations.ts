import { Todo } from "@/app/todos/[id]/page";
import { client } from "../../axios/client";
import { SWRMutationConfiguration } from "swr/mutation";
import { MutatorOptions } from "swr";
import { addTodo, deleteTodo, updateTodo } from "../../axios/todos";

export const addTodoMutation = async (newTodo: Todo, todos: Todo[]) => {
  const addedTodo = await addTodo({
    completed: newTodo.completed,
    description: newTodo.description,
  });
  return [...todos, addedTodo];
};
export const addTodoOptions = (
  newTodo: Todo,
  todos: Todo[]
): MutatorOptions => {
  return {
    optimisticData: [newTodo, ...todos],
    revalidate: false,
    populateCache: true, // default
    // to save one extra revalidate, we disable revalidate
    // populateCache is good enough since we will get the updated todos from 'addTodoMutation'
  };
};

export const deleteTodoMutation = async (id: number, todos: Todo[]) => {
  await deleteTodo(id);
  return todos.filter((x) => x.id !== id);
};
export const deleteTodoOptions = (
  id: number,
  todos: Todo[]
): MutatorOptions => {
  return {
    optimisticData: todos.filter((x) => x.id !== id),
    revalidate: false,
  };
};

export const updateTodoMutation = async (todo: Todo, todos: Todo[]) => {
  const updatedTodo = await updateTodo(todo);
  return todos.map((x) => {
    if (x.id === todo.id) {
      return updatedTodo;
    } else {
      return x;
    }
  });
};
export const updateTodoOptions = (
  todo: Todo,
  todos: Todo[]
): MutatorOptions => {
  return {
    optimisticData: todos.map((x) => {
      if (x.id === todo.id) {
        return todo;
      } else {
        return x;
      }
    }),
    // This is good here since we know what the return payload should look like
    // Hence, we don't need to call 1 extra request to revalidate if they match
    revalidate: false,
  };
};
