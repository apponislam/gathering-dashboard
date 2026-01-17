import { baseApi } from "@/redux/api/baseApi";

export const notificationsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (params?: { page?: number; limit?: number }) => ({
                url: "/notifications",
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            }),
            providesTags: ["Notifications"],
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationsApi;
