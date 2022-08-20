// https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoType {
  username: boolean;
  title: boolean;
  content: boolean;
  id: boolean;
  createAt: boolean;
  updatedAt: boolean;
  isDone: boolean;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<TodoType[], void>({
      query: () => "todo",
      // providesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});
