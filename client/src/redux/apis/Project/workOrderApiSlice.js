import { apiSlice } from "../apiSlice";

const PROJECTS_URL = "http://3.135.107.71/project";

const wordOrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        requestWorkOrder: builder.mutation({
            query:(data) => ({
                url: `${PROJECTS_URL}/addWorkOrderReq`,
                method: 'POST',
                body: data,
            })
        }),
        getRequestWorkOrder: builder.query({
            query: (body) => ({
                url: `${PROJECTS_URL}/getWorkOrder/52`,
                method: 'GET'
            })
        }),
        updateRequestWorkOrder: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/updateWorkOrder`,
                method: 'PATCH',
                body: data
            })
        }),
        updateWorkOrderRead: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/workOrderNotificationRead`,
                method: 'PATCH',
                body: data
            })
        }),
        getNotifications: builder.query({
            query: (data) => ({
                url: `${PROJECTS_URL}/getWorkOrderNotificationsPending/${data}`,
                method: 'GET'
            })
        }),
       
    })
})

export const {
    useRequestWorkOrderMutation,
    useGetRequestWorkOrderQuery,
    useUpdateRequestWorkOrderMutation,
    useUpdateWorkOrderReadMutation,
    useGetNotificationsQuery
} = wordOrderApiSlice;