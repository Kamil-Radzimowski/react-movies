import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {detailedMovie, loginCredentials, loginResponse, movie, registerCredentials, searchResult, comment} from "./types";
import {teal} from "@mui/material/colors";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getMovieDetailsById: builder.query<detailedMovie, string>({
            query: (id) => `movie/${id}`,
            transformResponse: (response: {movie: detailedMovie}) => {
                // console.log(response)
                return response.movie
            }
        }),
        getRecommendedMovies: builder.query<movie[], void>({
            query: () => `recommendation`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                console.log(response.results.slice(0, 5))
                return response.results.slice(0, 5)
            }
        }),
        getMovieByName: builder.query<searchResult, {str: string, page: string}>({
            query: ({str,  page}) => `search?query=${str}&page=${page}`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                // console.log(response)
                return {
                    total_results: response.total_results,
                    results: response.results
                }
            }
        }),
        getCommentsForMovie: builder.query<comment[], {id: string}>({
            query: (id) => `comments?id=${id}`,
            transformResponse: (response: comment[]) => {
                return response
            }
        }),
        addComment: builder.mutation<void, {text: string, user: string | undefined}>({
            query({text, user}) {
                return {
                    url: `comments?text=${text}&user=${user}`,
                    method: 'POST'
                }
            }
        }),
        login: builder.mutation<loginResponse, loginCredentials>({
            query(credentials) {
                return {
                    url: `login?email=${credentials.email}&password=${credentials.password}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: loginResponse) =>{
                console.log(response)
                return response
            }
        }),
        register: builder.mutation<loginResponse, registerCredentials>({
            query(credentials) {
                return {
                    url: `register?email=${credentials.email}&password=${credentials.password}&name=${credentials.name}`,
                    method: 'POST',
                };
            },
            transformResponse: (response: loginResponse) =>{
                console.log(response)
                return response
            }
        })
    }),
})

export const { useGetMovieDetailsByIdQuery, useGetRecommendedMoviesQuery, useGetMovieByNameQuery, useLoginMutation, useRegisterMutation, useGetCommentsForMovieQuery, useAddCommentMutation} = movieApi
// useLoginMutation