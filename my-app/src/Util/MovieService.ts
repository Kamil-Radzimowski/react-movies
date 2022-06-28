import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import config from "./Config";
import {detailedMovie, movie} from "./types";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getMovieDetailsById: builder.query<detailedMovie, string>({
            query: (id) => `movie/${id}?api_key=${config.getApiKey()}&language=pl`,
            transformResponse: (response: detailedMovie) => {
                // console.log(response)
                return response
            }
        }),
        getRecommendedMovies: builder.query<movie[], void>({
            query: () => `discover/movie?api_key=${config.getApiKey()}&language=pl`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                //console.log(response.results.slice(0, 5))
                return response.results.slice(0, 5)
            }
        }),
        getMovieByName: builder.query<movie[], {str: string, page: string}>({
            query: ({str,  page}) => `search/movie?api_key=${config.getApiKey()}&query=${str}&page=${page}`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                // console.log(response)
                return response.results
            }
        })
    }),
})

export const { useGetMovieDetailsByIdQuery, useGetRecommendedMoviesQuery, useGetMovieByNameQuery } = movieApi
