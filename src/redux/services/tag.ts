import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API as string,
  prepareHeaders: (headers: Headers) => {
    const token = Cookies.get("token") ? JSON.parse(Cookies.get("token") as string) : null;
    headers.set("Content-Type", "application/json");
    if (token && token.access && token.access.token) {
      headers.set("authorization", `Bearer ${token.access.token}`);
    }
    return headers;
  },
});

export const tags = createApi({
  reducerPath: "Tags",
  baseQuery,
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    getTags: builder.query<any, string>({
      query: () => {
        return {
          url: "api/v1/tag",
          method: "GET",
        };
      },
      providesTags: ["Tags"],
    }),
    addTag: builder.mutation<any, { name: string }>({
      query: (body) => ({
        url: "api/v1/tag",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Tags"],
    }),
    getTagById: builder.query<any, number>({
      query: (id) => ({
        url: `api/v1/tag/${id}`,
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),
    updateTag: builder.mutation<any, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `api/v1/tag/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Tags"],
    }),
    deleteTag: builder.mutation<any, number>({
      query: (id) => ({
        url: `api/v1/tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useGetTagsQuery, useAddTagMutation, useUpdateTagMutation, useDeleteTagMutation, useGetTagByIdQuery } = tags;
