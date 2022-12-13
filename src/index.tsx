import React, {  useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import MainPage from './Pages/MainPage';
const PublicSurveyPage = lazy(() => import('./Pages/PublicSurveyPage'))
const DashboardPage = lazy(() => import('./Pages/DashboardPage'))




const container = document.getElementById('root')!;
const root = createRoot(container);
const AnalyticsPage = lazy(() => import('./Pages/AnalyticsPage'))
const SurveyPage = lazy(() => import('./Pages/SurveyPage'))
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/survey/:id",
        element: <Suspense fallback={<div className='loader'></div>}><SurveyPage /></Suspense>
      },
      {
        path: "/survey/:id/analytics",
        element: <Suspense fallback={<div className='loader'></div>}><AnalyticsPage /></Suspense>
      },
      {
        path: "/dashboard",
        element: <Suspense fallback={<div className='loader'></div>}><DashboardPage /></Suspense>
      },
    ]
  },

  {
    path: "/s/:id",
    element: <Suspense fallback={<div className='loader'></div>}><PublicSurveyPage /></Suspense>
  },

]
const router = createBrowserRouter(routes);


root.render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
