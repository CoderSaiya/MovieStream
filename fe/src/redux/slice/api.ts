import { ApiResponse } from "@/types";
import { MovieType } from "@/types/movie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.API_BASE_URL;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => `users`,
    }),
    getMovieById: builder.query<ApiResponse<MovieType>, number>({
      query: (id) => ({
        url: `api/Movie/public/${id}`,
        method: 'GET'
      })
    })
  }),
});

export const { useGetProductByNameQuery, useGetMovieByIdQuery } = moviesApi;