import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export interface Survey {
  name: string
  id: number
  config: string
  link: string
}

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  tagTypes: ['Surveys'],
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/survey` }),
  endpoints: (builder) => ({
    getSurveyById: builder.query<Survey, string>({
      query: (id) => `/${id}`,
      providesTags: ['Surveys'],
    }),
    getSurveyByLink: builder.query<Survey, string>({
      query: (id) => `/link/${id}`,
      providesTags: ['Surveys'],
    }),
    getSurveys: builder.query({
      query: (id) => `/`,
      providesTags: ['Surveys'],
    }),

    addNewSurvey: builder.mutation({
      query: (payload) => ({
        url: '/',
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
        url: `/${id}`,
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
        url: `/${id}/public-id`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    bulkDeleteSurveys: builder.mutation({
      query: (payload) => ({
        url: '/delete',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Surveys'],
    }),
    getAnalytics: builder.query({
      query: (id) => `/analytics`,
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