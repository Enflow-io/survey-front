import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as Lockr from 'lockr';
export interface User {
    name: string | null
    id: number | null
    token: string | null
}



export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['auth'],
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/auth` }),
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['auth']
        }),
    })
})




const userSlice = createSlice({
    name: 'userSlice',
    initialState: { name: localStorage.getItem("name"), token: localStorage.getItem("token"), id: localStorage.getItem("id") } as User,
    reducers: {
        setCredentials: (
            state,
            { payload: { name, id, token } }: PayloadAction<{ name: (string | null); token: string, id: (number | null) }>

        ) => {
            state.id = id
            state.token = token
            state.name = name
        },
        signOut: (state) => {
            state.id = null
            state.token = null
            state.name = null

            Lockr.rm('token');
        }
    },
})

export const { setCredentials, signOut } = userSlice.actions
export const { reducer } = userSlice
export const selectCurrentUser = (state: any) => state.userSlice

export const { useLoginMutation } = authApi;
export default userSlice;