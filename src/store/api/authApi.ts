//TODO: ต้องมาแก้ไขให้เป็นของเรา

import { baseApi } from "./baseApi";

// Types
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),

        // Invalidate cache หลัง login สำเร็จ
        invalidatesTags: ["Auth"],

        // เก็บ token หลัง login
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            // TODO: ต้องเก็บลงใน cookie
            localStorage.setItem("token", data.token);
          } catch (error) {
            console.error("Login failed:", error);
          }
        },
      }),

      // 📌 Logout (POST)
      logout: builder.mutation<void, void>({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            await queryFulfilled;

            // TODO: ต้องลบใน cookie
            localStorage.removeItem("token");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      }),

      // 📌 Get Current User (GET)
      getCurrentUser: builder.query<User, void>({
        query: () => "/auth/me",
        providesTags: ["Auth"],
      }),
    };
  },
});

// Export hooks (auto-generated)
export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApi;
