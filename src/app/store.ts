import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { answersApi } from './services/answer.service';
import { surveyApi } from './services/survey';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [surveyApi.reducerPath]: surveyApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(surveyApi.middleware).concat(answersApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
