import {movieApi} from "../Util/MovieService";
import {comment, groupedComments} from "../Util/types";


const extendedApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
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
        deleteComment: builder.mutation<void, {id: string, commentId: string}>({
            query({id, commentId}) {
                return {
                    url: `comment/comments/delete/${id}/${commentId}`,
                    method: 'DELETE'
                }
            }
        }),
        getCommentsGroupedByMovie: builder.query<groupedComments[], void>({
            query: () => `comment/comments/grouped`,
            transformResponse: (response: groupedComments[]) => {
                console.log(response)
                return response
            }
        }),
    }),
    overrideExisting: false,
})

export const {useGetCommentsForMovieQuery, useAddCommentMutation, useDeleteCommentMutation,  useGetCommentsGroupedByMovieQuery} = extendedApi