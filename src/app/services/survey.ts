import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import userSlice from './auth.service'
import { baseQueryWithRedirect } from './baseQuery'


export interface Survey {
  name: string
  id: number
  config: string
  link: string
}

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  tagTypes: ['Surveys'],
  baseQuery: baseQueryWithRedirect,
  endpoints: (builder) => ({
    getSurveyById: builder.query<Survey, string>({
      query: (id) => `/survey/${id}`,
      providesTags: ['Surveys'],
    }),
    getSurveyByLink: builder.query<Survey, string>({
      query: (id) => `/public-survey/link/${id}`,
      providesTags: ['Surveys'],
    }),
    getSurveys: builder.query({
      query: (id) => `/survey/`,
      providesTags: ['Surveys'],
    }),

    addNewSurvey: builder.mutation({
      query: (payload) => ({
        url: '/survey',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    updateSurvey: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `/survey/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    publicateSurvey: builder.mutation({
      query: (id) => ({
        url: `/survey/${id}/public-id`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    bulkDeleteSurveys: builder.mutation({
      query: (payload) => ({
        url: '/survey/delete',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    getAnalytics: builder.query({
      query: (id) => `/survey/analytics`,
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSurveyByIdQuery,
  useGetSurveysQuery, useAddNewSurveyMutation,
  useBulkDeleteSurveysMutation,
  useUpdateSurveyMutation,
  usePublicateSurveyMutation,
  useGetSurveyByLinkQuery
} = surveyApi