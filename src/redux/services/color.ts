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

export const colors: any = createApi({
  reducerPath: "Colors",
  baseQuery,
  tagTypes: ["Colors"],
  endpoints: (builder) => ({
    createColor: builder.mutation<any, { data: string }>({
      query: (body) => {
        return {
          url: "api/v1/color",
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["Colors"],
    }),
    getColors: builder.query<any, any>({
      query: (filters) => {
        const searchParams = new URLSearchParams({ ...filters });
        return {
          url: "api/v1/color?" + searchParams,
          method: "GET",
        };
      },
      providesTags: ["Colors"],
    }),
    deleteColor: builder.mutation<any, number>({
      query: (id: number) => {
        return {
          url: `api/v1/color/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Colors"],
    }),
    getColorById: builder.query<any, number>({
      query: (colorId) => ({
        url: `api/v1/color/${colorId}`,
        method: "GET",
      }),
      providesTags: ["Colors"],
    }),
    updateColor: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `api/v1/color/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),
  }),
});
export const { useCreateColorMutation, useGetColorsQuery, useDeleteColorMutation, useUpdateColorMutation, useGetColorByIdQuery } = colors;
