import React, { ReactNode, useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from './Layout/Layout';
import MainPage from './Pages/MainPage';
// import SurveyPage from './Pages/SurveyPage';
import PublicSurveyPage from './Pages/PublicSurveyPage';
// import AnalyticsPage from './Pages/AnalyticsPage';
import DashboardPage from './Pages/DashboardPage';




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
        element: <DashboardPage />
      },
    ]
  },

  {
    path: "/s/:id",
    element: <PublicSurveyPage />
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
