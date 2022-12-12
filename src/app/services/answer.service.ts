import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import exp from 'constants';

export interface Answer {
    id: number
    surveyId: number
    data: string
}

export const answersApi = createApi({
    reducerPath: 'answersApi',
    tagTypes: ['Answers'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3010/answer' }),
    endpoints: (builder) => ({
        addNewAnswer: builder.mutation({
            query: (payload) => ({
                url: '/',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
              invalidatesTags: ['Answers']
        }),
        getAnswers: builder.query({
            query: (surveyId) => `/?surveyId=${surveyId}`,
            providesTags: ['Answers'],
          }),
    })
});


export const { useAddNewAnswerMutation, useGetAnswersQuery} = answersApi;