import { baseApi } from "@/redux/api/baseApi";

interface PublicContentData {
    _id: string;
    content: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

interface PublicContentResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: PublicContentData;
}

export const publicContentApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getPrivacyPolicy: builder.query<PublicContentResponse, void>({
            query: () => ({
                url: "/public/privacy-policy",
                method: "GET",
            }),
            providesTags: ["PrivacyPolicy"],
        }),

        getTermsAndCondition: builder.query<PublicContentResponse, void>({
            query: () => ({
                url: "/public/terms-and-condition",
                method: "GET",
            }),
            providesTags: ["TermsAndCondition"],
        }),
    }),
});

export const { useGetPrivacyPolicyQuery, useGetTermsAndConditionQuery } = publicContentApi;
