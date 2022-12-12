import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { surveyApi, useAddNewSurveyMutation } from './survey';
const createFormSlice = createSlice({
    name: "createForm",
    initialState: {
        isLoading: false,
        values: {}
    },
    reducers: {
        clearForm(state, action){
            state.values = {};
        },
        startSaveData(state, action){
            state.isLoading = true
        },
        finishSaveData(state, action){
            state.isLoading = false
        },

    }

})

export const { clearForm, startSaveData, finishSaveData } = createFormSlice.actions

export const submitForm =  createAsyncThunk("creatForm", async (payload: any, thunkAPI: any) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(startSaveData({}));
    dispatch(surveyApi.endpoints.addNewSurvey.initiate(
        payload
    ))
    dispatch(finishSaveData({}));
    dispatch(clearForm({}));
})