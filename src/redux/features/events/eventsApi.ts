import { baseApi } from "@/redux/api/baseApi";

export enum EVENT_STATUS {
    PENDING = "pending",
    APPROVED = "approved",
    PUBLISHED = "published",
    CANCELLED = "cancelled",
    ARCHIVED = "archived",
    COMPLETED = "completed",
    REJECTED = "rejected",
}

export enum EVENT_CATEGORIES {
    MUSIC = "music",
    SPORTS = "sports",
    BUSINESS = "business",
    EDUCATION = "education",
    FOOD_DRINK = "food_drink",
    ARTS_CULTURE = "arts_culture",
    TECHNOLOGY = "technology",
    HEALTH_WELLNESS = "health_wellness",
    ENTERTAINMENT = "entertainment",
    COMMUNITY = "community",
    FASHION = "fashion",
    TRAVEL = "travel",
    FAMILY = "family",
    CHARITY = "charity",
    RELIGIOUS = "religious",
    OTHER = "other",
}

interface EventQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    status?: EVENT_STATUS;
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
}

interface EventResponse {
    success: boolean;
    message: string;
    data: any;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface SingleEventResponse {
    success: boolean;
    message: string;
    data: any;
}

export const eventsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get all events with pagination and filters
        getEvents: builder.query<EventResponse, EventQueryParams>({
            query: (params) => {
                const queryParams: Record<string, any> = {};

                queryParams.page = params.page || 1;
                queryParams.limit = params.limit || 10;

                if (params.category) queryParams.category = params.category;
                if (params.status) queryParams.status = params.status;
                if (params.startDate) queryParams.startDate = params.startDate;
                if (params.endDate) queryParams.endDate = params.endDate;
                if (params.searchTerm) queryParams.searchTerm = params.searchTerm;

                return {
                    url: "/event",
                    method: "GET",
                    params: queryParams,
                    credentials: "include",
                };
            },
            providesTags: ["Event"],
        }),

        // Get my events (organized by the current user)
        getMyEvents: builder.query<EventResponse, EventQueryParams>({
            query: (params) => {
                const queryParams: Record<string, any> = {};

                queryParams.page = params.page || 1;
                queryParams.limit = params.limit || 10;

                if (params.category) queryParams.category = params.category;
                if (params.status) queryParams.status = params.status;
                if (params.startDate) queryParams.startDate = params.startDate;
                if (params.endDate) queryParams.endDate = params.endDate;
                if (params.searchTerm) queryParams.searchTerm = params.searchTerm;

                return {
                    url: "/event/my-events",
                    method: "GET",
                    params: queryParams,
                    credentials: "include",
                };
            },
            providesTags: ["MyEvent"],
        }),

        getEventById: builder.query<SingleEventResponse, string>({
            query: (id) => ({
                url: `/event/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: "Event", id }],
        }),

        // Create a new event
        createEvent: builder.mutation<SingleEventResponse, FormData>({
            query: (formData) => ({
                url: "/event",
                method: "POST",
                body: formData,
                credentials: "include",
            }),
            invalidatesTags: ["Event", "MyEvent"],
        }),

        // Update event
        updateEvent: builder.mutation<SingleEventResponse, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/event/${id}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (result, error, { id }) => ["Event", "MyEvent", { type: "Event", id }],
        }),

        // Delete event
        deleteEvent: builder.mutation<SingleEventResponse, string>({
            query: (id) => ({
                url: `/event/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Event", "MyEvent"],
        }),

        // Get nearby events
        getNearbyEvents: builder.mutation<EventResponse, { lat: number; lng: number; distance?: number }>({
            query: (data) => ({
                url: "/event/nearby",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetEventsQuery, useGetMyEventsQuery, useGetEventByIdQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation, useGetNearbyEventsMutation } = eventsApi;
