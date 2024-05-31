import { apiSlice } from "../apiSlice";

const CHAT_URL = "http://192.168.0.113:8080/projectChat";

const chatApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getChatMessages: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/messageList`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {
    useGetChatMessagesMutation
} = chatApiSlice;