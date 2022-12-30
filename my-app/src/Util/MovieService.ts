import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    detailedMovie,
    loginCredentials,
    loginResponse,
    movie,
    registerCredentials,
    searchResult,
    comment,
    user, news, groupedComments
} from "./types";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: () => ({
    }),
})
// useLoginMutation