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

export const category: any = createApi({
  reducerPath: "category",
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<any, any>({
      query: (filters) => {
        const searchParams = new URLSearchParams({ ...filters });
        return {
          url: "api/v1/category?" + searchParams,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<any, { data: any }>({
      query: (body) => ({
        url: "api/v1/category",
        method: "POST",
        body: body.data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, number>({
      query: (id) => ({
        url: `api/v1/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getCategoryById: builder.query<any, number>({
      query: (id) => ({
        url: `api/v1/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `api/v1/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery } = category;
