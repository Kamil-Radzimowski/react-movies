import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: () => ({
    }),
})
// useLoginMutation