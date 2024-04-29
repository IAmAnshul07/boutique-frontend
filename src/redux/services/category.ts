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

export const category = createApi({
  reducerPath: "category",
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: "api/v1/category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = category;
