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

                // Always include pagination with defaults
                queryParams.page = params.page || 1;
                queryParams.limit = params.limit || 10;

                // Include optional params only if they have values
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

        getEventById: builder.query<SingleEventResponse, string>({
            query: (id) => ({
                url: `/event/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: "Event", id }],
        }),
    }),
});

export const { useGetEventsQuery, useGetEventByIdQuery } = eventsApi;
