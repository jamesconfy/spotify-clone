/* eslint-disable comma-dangle */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongsRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongsRelatedQuery } = shazamCoreApi;
