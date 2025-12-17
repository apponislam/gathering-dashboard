import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // ... existing endpoints ...

        getAdminUsersStats: builder.query({
            query: () => ({
                url: "/stats/admin/users",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Dashboard"],
        }),

        getAdminDashboardStats: builder.query({
            query: () => ({
                url: "/stats/admin/dashboard",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    // ... other exports ...
    useGetAdminUsersStatsQuery,
    useGetAdminDashboardStatsQuery,
} = dashboardApi;
