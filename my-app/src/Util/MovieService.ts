import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import config from "./Config";
import {detailedMovie, movie} from "../Util/types";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getMovieDetailsById: builder.query<detailedMovie, string>({
            query: (id) => `movie/${id}?api_key=${config.getApiKey()}&language=pl`,
        }),
    }),
})

export const { useGetMovieDetailsByIdQuery } = movieApi
