import { apiSlice } from "../apiSlice";

const USER_PROJECTS_URL = "http://192.168.0.101:8080/user";

export const userProjectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            getUserProjects: builder.query({
                query: (data)=> ({
                    url: `${USER_PROJECTS_URL}/projects/${data.userId}`,
                    method: 'GET',
                })
            })
    })
})

export const {useGetUserProjectsQuery} = userProjectsApiSlice;