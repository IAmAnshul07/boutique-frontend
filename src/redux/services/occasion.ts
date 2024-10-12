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

export const occasions = createApi({
  reducerPath: "Occasions",
  baseQuery,
  tagTypes: ["Occasions"],
  endpoints: (builder) => ({
    getOccasions: builder.query<any, void>({
      query: () => {
        return {
          url: "api/v1/occasion",
          method: "GET",
        };
      },
      providesTags: ["Occasions"],
    }),
    addOccasion: builder.mutation<any, { name: string }>({
      query: (body) => ({
        url: "api/v1/occasion",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Occasions"],
    }),
    getOccasionById: builder.query<any, number>({
      query: (id) => ({
        url: `api/v1/occasion/${id}`,
        method: "GET",
      }),
      providesTags: ["Occasions"],
    }),
    updateOccasion: builder.mutation<any, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `api/v1/occasion/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Occasions"],
    }),
    deleteOccasion: builder.mutation<any, number>({
      query: (id) => ({
        url: `api/v1/occasion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Occasions"],
    }),
  }),
});

export const { useGetOccasionsQuery, useAddOccasionMutation, useUpdateOccasionMutation, useDeleteOccasionMutation, useGetOccasionByIdQuery } = occasions;
