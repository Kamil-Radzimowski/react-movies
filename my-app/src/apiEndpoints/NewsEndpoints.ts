import {movieApi} from "../Util/MovieService";
import {news} from "../Util/types";

const extendedApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNews: builder.query<news[], void>({
            query: () => `news/all`,
            transformResponse: (response: news[]) => {
                return response
            }
        }),
        addNews: builder.mutation<void, {title: string, desc: string}>({
            query({title, desc}) {
                return {
                    url: `news/${title}/${desc}`,
                    method: 'POST'
                }
            }
        }),
        deleteNews: builder.mutation<void, {id: string}>({
            query({id}) {
                return {
                    url: `news/${id}`,
                    method: 'DELETE'
                }
            }
        }),
        updateNews: builder.mutation<void, {id: string, title: string, desc: string}>({
            query({id, title, desc}) {
                return {
                    url: `news/${id}/${title}/${desc}`,
                    method: 'PATCH'
                }
            }
        }),
    }),
    overrideExisting: false,
})

export const { useAddNewsMutation, useGetAllNewsQuery, useDeleteNewsMutation, useUpdateNewsMutation } = extendedApi