import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import userSlice, { signOut } from "./auth.service";

const query = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
        const state: any = getState();
        const authState = state[userSlice.name];
        const token = authState?.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },


})
export const baseQueryWithRedirect: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await query(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(signOut());
    }
    return result;
};

