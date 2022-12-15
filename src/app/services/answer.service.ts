import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRedirect } from './baseQuery';


export interface Answer {
    id: number
    surveyId: number
    data: string
}

export const answersApi = createApi({
    reducerPath: 'answersApi',
    tagTypes: ['Answers'],
    baseQuery: baseQueryWithRedirect,
    endpoints: (builder) => ({
        addNewAnswer: builder.mutation({
            query: (payload) => ({
                url: '/answer/',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
              invalidatesTags: ['Answers']
        }),
        getAnswers: builder.query({
            query: (surveyId) => `/answer/?surveyId=${surveyId}`,
            providesTags: ['Answers'],
          }),
    })
});


export const { useAddNewAnswerMutation, useGetAnswersQuery} = answersApi;