import { apiSlice } from "../apiSlice";
import { useUpdateUserLineItemStatusMutation } from "./projectApiSlice";

const PROJECTS_URL = "http://192.168.0.112:8080/project";
const USERS_URL = 'http://192.168.0.112:8080/user';
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
        getNotificationsUnread: builder.query({
            query: (data) => ({
                url: `${PROJECTS_URL}/workOrderNotificationReadCount/${data}`,
                method: 'GET',
            })
        }),
       getTeamStatusNotifications: builder.query({
        query: (data) => ({
            url: `${USERS_URL}/getTeamStatusNotifications/${data}`,
            method: 'GET'
        })
       }),
       updateTeamStatusNotifications: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/updateTeamStatusNotifications/${data}`,
            method: 'PUT',
            body: data
        })
       })
    })
})

export const {
    useRequestWorkOrderMutation,
    useGetRequestWorkOrderQuery,
    useUpdateRequestWorkOrderMutation,
    useUpdateWorkOrderReadMutation,
    useGetNotificationsQuery,
    useGetNotificationsUnreadQuery,
    useGetTeamStatusNotificationsQuery,
    useUpdateTeamStatusNotificationsMutation,
} = wordOrderApiSlice;