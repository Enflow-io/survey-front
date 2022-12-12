import React, { ReactNode, useState } from 'react';
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
import SurveyPage from './Pages/SurveyPage';
import PublicSurveyPage from './Pages/PublicSurveyPage';
import AnalyticsPage from './Pages/AnalyticsPage';
import DashboardPage from './Pages/DashboardPage';




const container = document.getElementById('root')!;
const root = createRoot(container);
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
        element: <SurveyPage />
      },
      {
        path: "/survey/:id/analytics",
        element: <AnalyticsPage />
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
