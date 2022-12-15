import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { answersApi } from './services/answer.service';
import { surveyApi } from './services/survey';
import { authApi, reducer } from './services/auth.service';

export const store = configureStore({
  reducer: {
    [surveyApi.reducerPath]: surveyApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    userSlice: reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().
    concat(surveyApi.middleware).
    concat(answersApi.middleware).
    concat(authApi.middleware),
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
