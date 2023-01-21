import {loginCredentials, loginResponse, registerCredentials, user} from "../Util/types";


import {movieApi} from "../Util/MovieService";

const extendedApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
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
    overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation,  useGetAllUsersQuery, useUpdateUserIsAdminMutation, useDeleteUserMutation,} = extendedApi


