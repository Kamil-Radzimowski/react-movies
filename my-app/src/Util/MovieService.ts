import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    detailedMovie,
    loginCredentials,
    loginResponse,
    movie,
    registerCredentials,
    searchResult,
    comment,
    user
} from "./types";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getAllMovies: builder.query<detailedMovie[], void>({
            query: () => `movie/all`,
            transformResponse: (response: detailedMovie[]) => {
                return response
            }
        }),
        voteOnMovie: builder.mutation<void, {id: string, vote: number}>({
            query({id, vote}){
                return{
                    url: `movie/vote/${id}/${vote}`,
                    method: "POST"
                }
            }
        }),
        getMovieDetailsById: builder.query<detailedMovie, string>({
            query: (id) => `movie/${id}`,
            transformResponse: (response: {movie: detailedMovie}) => {
                // console.log(response)
                return response.movie
            }
        }),
        getRecommendedMovies: builder.query<movie[], void>({
            query: () => `movie/recommendation`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                console.log(response.results.slice(0, 5))
                return response.results.slice(0, 5)
            }
        }),
        getMovieByName: builder.query<searchResult, {str: string, page: string}>({
            query: ({str,  page}) => `movie/search?query=${str}&page=${page}`,
            transformResponse: (response: {results: movie[], page: number, total_pages: number, total_results: number}) => {
                // console.log(response)
                return {
                    total_results: response.total_results,
                    results: response.results
                }
            }
        }),
        getCommentsForMovie: builder.query<comment[], string>({
            query: (id) => `comment/comments?id=${id}`,
            transformResponse: (response: comment[]) => {
                return response
            }
        }),
        addComment: builder.mutation<void, {id: string, text: string, user: string | undefined}>({
            query({id, text, user}) {
                return {
                    url: `comment/comments/${id}?text=${text}&user=${user}`,
                    method: 'POST'
                }
            }
        }),
        login: builder.mutation<loginResponse, loginCredentials>({
            query(credentials) {
                return {
                    url: `user/login?email=${credentials.email}&password=${credentials.password}`,
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
                    url: `user/register?email=${credentials.email}&password=${credentials.password}&name=${credentials.name}`,
                    method: 'POST',
                };
            },
            transformResponse: (response: loginResponse) =>{
                console.log(response)
                return response
            }
        }),
        getAllUsers: builder.query<user[], void>({
            query: () => `user/all`,
            transformResponse: (response: user[]) => {
                return response
            }
        }),
        deleteUser: builder.mutation<void, string>({
            query(id) {
                return {
                    url : `user/${id}/ban`,
                    method: "DELETE"
                }
            },
        }),
        updateUserIsAdmin: builder.mutation<void, {id: string, isAdmin: boolean}>({
            query({id, isAdmin}) {
                return {
                    url: `user/${id}/update?isAdmin=${isAdmin}`,
                    method: 'PATCH',
                };
            }
        }),
    }),
})

export const {useGetAllMoviesQuery, useGetMovieDetailsByIdQuery, useGetRecommendedMoviesQuery, useGetMovieByNameQuery, useLoginMutation, useRegisterMutation, useGetCommentsForMovieQuery, useAddCommentMutation, useGetAllUsersQuery, useUpdateUserIsAdminMutation, useDeleteUserMutation, useVoteOnMovieMutation} = movieApi
// useLoginMutation