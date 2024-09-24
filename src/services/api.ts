import { clearUserDetails, clearUserToken } from "@/slices/authSlice";
import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://medical-clinic.serv00.net/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Clinic", "Admin"],
  endpoints: (builder) => ({
    // auth
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserToken());
          dispatch(clearUserDetails());
        } catch (error) {
          console.error("Problem while logging out!", (error as Error).message);
        }
      },
    }),

    // create clinic
    createClinic: builder.mutation({
      query: (formData) => ({
        url: "/clinic",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Clinic"],
    }),

    // create admin
    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: "/actor",
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["Admin"],
    }),
    // Fetch all clinics for Super Admin

    getClinics: builder.query({
      query: () => ({
        url: "/clinic",
        method: "GET",
      }),
      providesTags: ["Clinic"],
    }),

    // Fetch all admins
    getAdmins: builder.query({
      query: () => "/actor/2",
      providesTags: ["Admin"],
    }),

    // update clinic
    updateClinic: builder.mutation({
      query: ({ clinicId, formData }) => ({
        url: `/clinic/${clinicId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Clinic"],
    }),
    // set Permissions

    setPermissions: builder.mutation({
      query: ({ adminId, permissions }) => ({
        url: `/actor_permissions/${adminId}`,
        method: "POST",
        body: permissions,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateClinicMutation,
  useCreateAdminMutation,
  useGetClinicsQuery,
  useGetAdminsQuery,
  useUpdateClinicMutation,
  useSetPermissionsMutation,
} = api;
