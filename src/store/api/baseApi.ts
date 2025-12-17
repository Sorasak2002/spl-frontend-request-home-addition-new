/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_BASE_URL_API } from "@/utils/string";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: GET_BASE_URL_API,

    prepareHeaders: (headers, { getState }) => {
      if (false) {
        headers.set("Authorization", "");
      }

      return headers;
    },
  }),

  // Tag สำหรับ cache invalidation
  tagTypes: ["User", "Request", "Auth"],

  endpoints: () => ({}), // endpoints จะถูกเพิ่มจาก api files อื่น
});
