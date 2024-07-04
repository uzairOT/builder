import { apiSlice } from "../apiSlice";

const CHAT_URL = "http://3.135.107.71/projectChat";
const USER_CHAT_URL = "http://3.135.107.71/chat";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/messageList`,
        method: "POST",
        body: data,
      }),
    }),
    createConverstaion: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/createConversation`,
        method: "POST",
        body: data,
      }),
    }),
    getConversation: builder.query({
      query: (data) => ({
        url: `${CHAT_URL}/getConversations/${data.userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetChatMessagesMutation, useCreateConverstaionMutation, useGetConversationQuery } =
  chatApiSlice;
