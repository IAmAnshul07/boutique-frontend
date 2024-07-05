import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.postalpincode.in/",
});
export const postalApi = createApi({
  reducerPath: "postalApi",
  baseQuery,
  endpoints: (builder) => ({
    getPostOfficeByPin: builder.query<any, string>({
      query: (pinCode) => ({
        url: `pincode/${pinCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostOfficeByPinQuery } = postalApi;
