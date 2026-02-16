// import { baseApi } from "@/redux/api/baseApi";

// export interface ChatMessage {
//     id: string;
//     userId: string;
//     userProfile: {
//         name: string;
//         avatar?: string;
//     };
//     message: string;
//     messageType: string;
//     formattedTime: string;
//     likes: number;
//     hasLiked: boolean;
//     createdAt: string;
// }

// export interface SendMessageRequest {
//     message: string;
// }

// export interface ChatParticipantsResponse {
//     total: number;
//     participants: Array<{
//         name: string;
//         avatar?: string;
//         id: string;
//     }>;
// }

// export const streamChatApi = baseApi.injectEndpoints({
//     overrideExisting: true,
//     endpoints: (builder) => ({
//         // Get chat messages
//         getChatMessages: builder.query({
//             query: ({ streamId, limit = 50 }: { streamId: string; limit?: number }) => ({
//                 url: `/chatmessage/${streamId}/messages`,
//                 method: "GET",
//                 params: { limit },
//             }),
//             providesTags: ["ChatMessages"],
//         }),

//         // Send message
//         sendMessage: builder.mutation({
//             query: ({ streamId, message }: { streamId: string; message: string }) => ({
//                 url: `/chatmessage/${streamId}/messages`,
//                 method: "POST",
//                 body: { message },
//             }),
//             invalidatesTags: ["ChatMessages"],
//         }),

//         // Get chat participants
//         getChatParticipants: builder.query({
//             query: (streamId: string) => ({
//                 url: `/chatmessage/${streamId}/participants`,
//                 method: "GET",
//             }),
//             providesTags: ["ChatParticipants"],
//         }),
//     }),
// });

// export const { useGetChatMessagesQuery, useSendMessageMutation, useGetChatParticipantsQuery, useLazyGetChatParticipantsQuery } = streamChatApi;

// redux/features/streamChat/streamChatApi.ts
import { baseApi } from "@/redux/api/baseApi";

export interface ChatMessage {
    id: string;
    userId: string;
    userProfile: {
        name: string;
        avatar?: string;
    };
    message: string;
    messageType: "text" | "emoji" | "system";
    formattedTime: string;
    likes: number;
    hasLiked: boolean;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: T[];
}

export interface SendMessageRequest {
    message: string;
    messageType?: "text" | "emoji";
}

export interface ChatParticipantsResponse {
    total: number;
    participants: Array<{
        name: string;
        avatar?: string;
        id: string;
    }>;
}

export const streamChatApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get chat messages with pagination
        getChatMessages: builder.query({
            query: ({ roomId, page = 1, limit = 50, before }: { roomId: string; page?: number; limit?: number; before?: string }) => ({
                url: `/chatmessage/${roomId}/messages`,
                method: "GET",
                params: { page, limit, before },
            }),
            providesTags: (result, error, { roomId }) => (result ? [{ type: "ChatMessages", id: roomId }] : ["ChatMessages"]),
        }),

        // Send message
        sendMessage: builder.mutation({
            query: ({ roomId, message, messageType = "text" }: { roomId: string; message: string; messageType?: "text" | "emoji" }) => ({
                url: `/chatmessage/${roomId}/messages`,
                method: "POST",
                body: { message, messageType },
            }),
            invalidatesTags: (result, error, { roomId }) => [{ type: "ChatMessages", id: roomId }],
        }),

        // Like/unlike message
        toggleMessageLike: builder.mutation({
            query: ({ messageId }: { messageId: string }) => ({
                url: `/chatmessage/messages/${messageId}/like`,
                method: "POST",
            }),
            invalidatesTags: ["ChatMessages"],
        }),

        // Delete message
        deleteMessage: builder.mutation({
            query: ({ messageId }: { messageId: string }) => ({
                url: `/chatmessage/messages/${messageId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ChatMessages"],
        }),

        // Get chat participants
        getChatParticipants: builder.query({
            query: (roomId: string) => ({
                url: `/chatmessage/${roomId}/participants`,
                method: "GET",
            }),
            providesTags: (result, error, roomId) => (result ? [{ type: "ChatParticipants", id: roomId }] : ["ChatParticipants"]),
        }),

        // Lazy queries for infinite scroll
        getMoreChatMessages: builder.query({
            query: ({ roomId, before, limit = 50 }: { roomId: string; before: string; limit?: number }) => ({
                url: `/chatmessage/${roomId}/messages`,
                method: "GET",
                params: { before, limit },
            }),
            providesTags: (result, error, { roomId }) => (result ? [{ type: "ChatMessages", id: roomId }] : ["ChatMessages"]),
        }),
    }),
});

export const { useGetChatMessagesQuery, useSendMessageMutation, useToggleMessageLikeMutation, useDeleteMessageMutation, useGetChatParticipantsQuery, useLazyGetMoreChatMessagesQuery, useLazyGetChatParticipantsQuery } = streamChatApi;
