// https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoType {
  username: string;
  title: string;
  content: string;
  id: number;
  createAt: Date;
  updatedAt: Date;
  isDone: boolean;
}

export interface Todo {
  username: string;
  title: string;
  content: string;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  // tagTypes: ["Todos"], 없어도 되는 부분
  endpoints: (builder) => ({
    getAll: builder.query<TodoType[], void>({
      query: () => "todo",
      // providesTags: [{ type: "Todos", id: "LIST" }], 없어도 되는 부분
    }),
    // builder.mutation<ReturnType , ResponseType>
    createTodo: builder.mutation<TodoType, Todo>({
      query(todo) {
        return {
          url: `todo`,
          method: "POST",
          body: todo,
        };
      },
    }),
  }),
});
