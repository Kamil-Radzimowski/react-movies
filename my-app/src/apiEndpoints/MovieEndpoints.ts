import {movieApi} from "../Util/MovieService";
import {detailedMovie, movie, searchResult} from "../Util/types";

const extendedApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMovies: builder.query<detailedMovie[], void>({
            query: () => `movie/all`,
            transformResponse: (response: detailedMovie[]) => {
                return response
            }
        }),
        updateMovie: builder.mutation<void, {id: number, title: string, desc: string, genres: string[]}>({
            query({id, title, desc, genres}) {
                return {
                    url: `movie/update/${id}?title=${title}&desc=${desc}&genres=${genres}`,
                    method: 'PATCH'
                }
            }
        }),
        voteOnMovie: builder.mutation<void, {id: string, vote: number}>({
            query({id, vote}){
                return{
                    url: `movie/vote/${id}/${vote * 2}`,
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
        getMovieByName: builder.query<searchResult, {str: string, page: string, sortOption: string}>({
            query: ({str,  page, sortOption}) => `movie/search?query=${str}&page=${page}&sort=${sortOption}`,
            transformResponse: (response: {results: movie[], page: number, number_of_pages: number, total_results: number}) => {
                // console.log(response)
                return {
                    total_results: response.total_results,
                    results: response.results,
                    number_of_pages: response.number_of_pages
                }
            }
        }),
        addMovie: builder.mutation<void, {title: string, desc: string, genres: string[], image: FormData}>({
            query({title, desc, genres, image}){
                return{
                    url: `movie/add/${title}/${desc}/${genres}`,
                    method: "POST",
                    body: image,
                    headers: {
                        "Content-Type": "multipart/form-data;",
                    },
                }
            }
        }),
    }),
    overrideExisting: false,
})

export const {useGetAllMoviesQuery, useGetMovieDetailsByIdQuery, useGetRecommendedMoviesQuery, useGetMovieByNameQuery, useVoteOnMovieMutation, useUpdateMovieMutation, useAddMovieMutation} = extendedApi