import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import {setIsAuthenticated, setLoading, setUser} from "../features/userSlice"


export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints: (builder) => ({
        getMe: builder.query({
            query:()=> "/me",
            transformResponse: (result) => result.user,
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setLoading(false))
                }

                catch(err) {
                    dispatch(setLoading(false))
                    console.log(err)
                }
            }
        })
    })
})


export const {
    useGetMeQuery
} = userApi